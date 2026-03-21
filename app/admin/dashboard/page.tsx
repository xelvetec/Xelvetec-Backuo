'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { useLanguage } from '@/lib/language-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminDashboard() {
  const { t, language } = useLanguage()
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  useEffect(() => {
    loadCustomers()
  }, [])

  async function loadCustomers() {
    try {
      const { data, error } = await supabase
        .from('users_profile')
        .select(`
          user_id,
          email,
          company_name,
          country,
          subscriptions (
            id,
            tier,
            status,
            current_period_end,
            amount,
            currency
          )
        `)

      if (error) throw error
      setCustomers(data || [])
    } catch (error) {
      console.error('Failed to load customers:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(c =>
    (c.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (c.company_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border border-foreground/10">
            <h3 className="text-sm text-foreground/60 mb-2">Total Customers</h3>
            <p className="text-3xl font-bold">{customers.length}</p>
          </Card>

          <Card className="p-6 border border-foreground/10">
            <h3 className="text-sm text-foreground/60 mb-2">Active Subscriptions</h3>
            <p className="text-3xl font-bold">
              {customers.reduce((sum, c) => sum + (c.subscriptions?.filter((s: any) => s.status === 'active').length || 0), 0)}
            </p>
          </Card>

          <Card className="p-6 border border-foreground/10">
            <h3 className="text-sm text-foreground/60 mb-2">MRR</h3>
            <p className="text-3xl font-bold">
              €{customers.reduce((sum, c) => sum + (c.subscriptions?.reduce((s: number, sub: any) => s + (sub.status === 'active' ? sub.amount / 100 : 0), 0) || 0), 0).toFixed(2)}
            </p>
          </Card>

          <Card className="p-6 border border-foreground/10">
            <h3 className="text-sm text-foreground/60 mb-2">Paused/Cancelled</h3>
            <p className="text-3xl font-bold">
              {customers.reduce((sum, c) => sum + (c.subscriptions?.filter((s: any) => s.status !== 'active').length || 0), 0)}
            </p>
          </Card>
        </div>

        <Card className="p-6 border border-foreground/10">
          <div className="mb-6">
            <Input
              placeholder="Search by email or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96"
            />
          </div>

          {loading ? (
            <p className="text-foreground/60">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="text-left py-3 px-2 text-sm font-medium">Email</th>
                    <th className="text-left py-3 px-2 text-sm font-medium">Company</th>
                    <th className="text-left py-3 px-2 text-sm font-medium">Country</th>
                    <th className="text-left py-3 px-2 text-sm font-medium">Subscriptions</th>
                    <th className="text-left py-3 px-2 text-sm font-medium">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => {
                    const activeSubs = customer.subscriptions?.filter((s: any) => s.status === 'active') || []
                    return (
                      <tr key={customer.user_id} className="border-b border-foreground/5 hover:bg-foreground/5">
                        <td className="py-3 px-2 text-sm">{customer.email || 'N/A'}</td>
                        <td className="py-3 px-2 text-sm">{customer.company_name || 'N/A'}</td>
                        <td className="py-3 px-2 text-sm">{customer.country?.toUpperCase() || 'N/A'}</td>
                        <td className="py-3 px-2 text-sm">{activeSubs.length}</td>
                        <td className="py-3 px-2 text-sm">
                          {activeSubs.length > 0 ? (
                            <span className="text-green-400">Active</span>
                          ) : (
                            <span className="text-foreground/60">Inactive</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-sm">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedCustomer(customer)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {selectedCustomer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full p-6 border border-foreground/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedCustomer.email}</h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCustomer(null)}
                >
                  Close
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-foreground/60">Company</label>
                  <p className="text-lg font-medium">{selectedCustomer.company_name || 'N/A'}</p>
                </div>

                <div>
                  <label className="text-sm text-foreground/60">Country</label>
                  <p className="text-lg font-medium">{selectedCustomer.country?.toUpperCase() || 'N/A'}</p>
                </div>

                {selectedCustomer.subscriptions && selectedCustomer.subscriptions.length > 0 && (
                  <div>
                    <label className="text-sm text-foreground/60 block mb-2">Subscriptions</label>
                    <div className="space-y-2">
                      {selectedCustomer.subscriptions.map((sub: any) => (
                        <div key={sub.id} className="bg-foreground/5 p-3 rounded">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium capitalize">{sub.tier}</span>
                            <span className={sub.status === 'active' ? 'text-green-400' : 'text-foreground/60'}>
                              {sub.status}
                            </span>
                          </div>
                          <div className="text-sm text-foreground/60">
                            {(sub.amount / 100).toFixed(2)} {sub.currency?.toUpperCase()} / month
                          </div>
                          <div className="text-sm text-foreground/60">
                            Until: {new Date(sub.current_period_end).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'tr' ? 'tr-TR' : 'en-US')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
