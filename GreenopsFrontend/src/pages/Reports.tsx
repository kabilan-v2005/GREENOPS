import React, { useState } from 'react';
import { Plus, MapPin, Camera, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import type { Report } from '../types';

const Reports: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  // Mock data for reports
  const mockReports: Report[] = [
    {
      id: '1',
      userId: 'user1',
      location: 'Central Park West Entrance',
      description: 'Large pile of non-recyclable construction waste dumped near the bins.',
      imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
      status: 'Pending',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      userId: 'user2',
      location: 'Main St & 5th Ave',
      description: 'Public recycling bin is overflowing and scattered across the sidewalk.',
      status: 'In Progress',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '3',
      userId: 'user1',
      location: 'Riverside Drive',
      description: 'Abandoned electronic waste (old TV and microwave).',
      status: 'Resolved',
      createdAt: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log({ location, description });
    setShowForm(false);
    setLocation('');
    setDescription('');
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Waste Reports</h1>
          <p className="mt-1 text-sm text-gray-500">Track and report illegal dumping and public waste issues.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : (
            <><Plus className="w-5 h-5 mr-2" /> Report Issue</>
          )}
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary-100 bg-primary-50/30">
          <CardHeader>
            <CardTitle>Submit New Waste Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Location"
                  placeholder="E.g., 123 Main St, Near Central Park"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  leftIcon={<MapPin className="w-4 h-4" />}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Upload Image
                  </label>
                  <label className="flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <Camera className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Choose file or take photo</span>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors min-h-[100px]"
                  placeholder="Describe the waste issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit">Submit Report</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reports List */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
          <CardTitle>Recent Reports</CardTitle>
          <div className="flex gap-2">
            <div className="w-full max-w-xs relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search location..." 
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white text-sm outline-none"
              />
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <div className="divide-y divide-gray-100">
          {mockReports.map((report) => (
            <div key={report.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-4">
              {report.imageUrl ? (
                <img 
                  src={report.imageUrl} 
                  alt="Waste location" 
                  className="w-full sm:w-32 h-24 object-cover rounded-lg shrink-0"
                />
              ) : (
                <div className="w-full sm:w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                  <Camera className="w-6 h-6 opacity-30" />
                </div>
              )}
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    {report.location}
                  </h3>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 flex-1">
                  {report.description}
                </p>
                <div className="text-xs text-gray-500 flex items-center gap-1 mt-auto">
                  Reported on {new Date(report.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Reports;
