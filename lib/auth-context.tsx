'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from './supabase-client'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    })
    if (error) throw error

    // Link existing subscriptions with the same email
    await linkExistingSubscriptions(email)
  }

  const linkExistingSubscriptions = async (email: string) => {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user?.user) return

      // Find subscriptions with matching email
      const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('customer_email', email)
        .is('user_id', null)

      if (error) {
        console.error('[v0] Error finding subscriptions to link:', error)
        return
      }

      if (subscriptions && subscriptions.length > 0) {
        // Link all matching subscriptions to this user
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({ user_id: user.user.id })
          .eq('customer_email', email)
          .is('user_id', null)

        if (updateError) {
          console.error('[v0] Error linking subscriptions:', updateError)
        } else {
          console.log(`[v0] Linked ${subscriptions.length} subscription(s) to user ${user.user.id}`)
        }
      }
    } catch (error) {
      console.error('[v0] Error in linkExistingSubscriptions:', error)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
