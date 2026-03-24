import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, AlertTriangle, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { getReports } from '../services/reportService';
import { getComplaints } from '../services/complaintService';
import { getResaleItems } from '../services/resaleService';
import { Report, Complaint, Item } from '../types';

const Dashboard: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [resaleItems, setResaleItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsData, complaintsData, resaleData] = await Promise.all([
          getReports(),
          getComplaints(),
          getResaleItems()
        ]);
        setReports(reportsData || []);
        setComplaints(complaintsData || []);
        setResaleItems(resaleData || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      name: 'Total Reports',
      value: reports.length.toString(),
      icon: FileText,
      trend: '+12%',
      trendUp: true,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Complaints',
      value: complaints.filter(c => c.status !== 'Resolved').length.toString(),
      icon: AlertTriangle,
      trend: '-5%',
      trendUp: false,
      color: 'bg-amber-500',
    },
    {
      name: 'Resale Items',
      value: resaleItems.length.toString(),
      icon: ShoppingBag,
      trend: '+18%',
      trendUp: true,
      color: 'bg-green-500',
    },
    {
      name: 'Community Impact',
      value: `${(reports.length * 2.5 + resaleItems.length * 5).toFixed(1)}kg`,
      icon: TrendingUp,
      trend: '+24%',
      trendUp: true,
      color: 'bg-primary-500',
    },
  ];

  const recentActivity = [
    ...reports.map(r => ({
      id: `rep-${r.id}`,
      action: 'Waste Report Submitted',
      location: r.location || 'Unknown Location',
      time: new Date(r.createdAt || Date.now()).toLocaleDateString(),
      date: new Date(r.createdAt || Date.now()),
      type: 'report'
    })),
    ...complaints.map(c => ({
      id: `comp-${c.complaintId}`,
      action: 'Complaint Filed',
      location: c.complaintDescription ? (c.complaintDescription.substring(0, 20) + '...') : 'System Issue',
      time: new Date(c.complaintDate || Date.now()).toLocaleDateString(),
      date: new Date(c.complaintDate || Date.now()),
      type: 'complaint'
    })),
    ...resaleItems.map(i => ({
      id: `res-${i.id}`,
      action: i.isSold ? 'Resale Item Sold' : 'Resale Item Listed',
      location: i.title || 'Item',
      time: new Date(i.createdAt || Date.now()).toLocaleDateString(),
      date: new Date(i.createdAt || Date.now()),
      type: 'resale'
    }))
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5); // top 5 recent activities

  if (isLoading) {
    return <div className="flex justify-center items-center h-full py-10">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex gap-2">
          {/* Action buttons could go here */}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={`font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend}
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="relative flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-gray-100">
                      {activity.type === 'report' && <FileText className="w-5 h-5 text-blue-500" />}
                      {activity.type === 'resale' && <ShoppingBag className="w-5 h-5 text-green-500" />}
                      {activity.type === 'complaint' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                      {activity.type === 'user' && <Users className="w-5 h-5 text-purple-500" />}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.location}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions / Info */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/reports" className="w-full flex items-center justify-between p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors border border-primary-100">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-primary-900">Report Waste</span>
                </div>
                <span className="text-primary-600">→</span>
              </Link>
              <Link to="/resale" className="w-full flex items-center justify-between p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors border border-green-100">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Sell an Item</span>
                </div>
                <span className="text-green-600">→</span>
              </Link>
              <Link to="/complaints" className="w-full flex items-center justify-between p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors border border-amber-100">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span className="font-medium text-amber-900">File Complaint</span>
                </div>
                <span className="text-amber-600">→</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
