-- Search function for knowledge base using vector similarity
create or replace function search_knowledge_base(
  query_embedding vector(1536),
  similarity_threshold float default 0.6,
  match_count int default 5
)
returns table (
  id uuid,
  content text,
  title text,
  section text,
  similarity float
) as $$
begin
  return query
  select
    kb.id,
    kb.content,
    kb.title,
    kb.section,
    (kb.embedding <#> query_embedding) * -1 as similarity
  from knowledge_base kb
  where (kb.embedding <#> query_embedding) * -1 > similarity_threshold
  order by kb.embedding <#> query_embedding
  limit match_count;
end;
$$ language plpgsql;

-- Create index for faster vector search
create index if not exists knowledge_base_embedding_idx
on knowledge_base using ivfflat (embedding vector_cosine_ops)
with (lists = 100);
