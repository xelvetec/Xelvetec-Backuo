-- Enable pgvector extension
create extension if not exists vector;

-- Create knowledge_base table for storing website content embeddings
create table if not exists knowledge_base (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  content_type varchar(50) not null, -- 'service', 'pricing', 'feature', 'faq', 'general'
  language varchar(10) not null default 'de', -- 'de', 'tr', 'en'
  title text not null,
  url text,
  embedding vector(1536), -- OpenAI embedding dimension
  metadata jsonb, -- store additional info like tags, category, etc
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create index for vector similarity search
create index on knowledge_base using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- Create chat_messages table for storing conversation history
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_id uuid not null, -- group messages by conversation session
  role varchar(20) not null, -- 'user' or 'assistant'
  content text not null,
  language varchar(10) not null default 'de',
  created_at timestamp with time zone default now()
);

-- Create index for faster queries
create index on chat_messages(session_id, created_at desc);
create index on chat_messages(user_id);

-- Enable RLS
alter table knowledge_base enable row level security;
alter table chat_messages enable row level security;

-- RLS policies for knowledge_base (public read-only)
create policy "Anyone can read knowledge_base" on knowledge_base
  for select using (true);

-- RLS policies for chat_messages (users can only see their own messages)
create policy "Users can view their own chat messages" on chat_messages
  for select using (
    auth.uid() = user_id or user_id is null
  );

create policy "Users can insert chat messages" on chat_messages
  for insert with check (
    auth.uid() = user_id or user_id is null
  );

create policy "Users can update their own chat messages" on chat_messages
  for update using (
    auth.uid() = user_id
  );
