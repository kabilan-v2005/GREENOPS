import React, { useState, useEffect } from 'react';
import { AlertCircle, FileText, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import type { Complaint } from '../types';
import { addComplaint, getComplaints } from '../services/complaintService';

const Complaints: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        userId: 2, // 🔥 later from login
        complaintDescription: description,
        proofImage: "" // no image for now
      };

      console.log("Sending:", data);

      await addComplaint(data);

      alert("Complaint submitted ✅");

      setDescription('');
      fetchComplaints();
    } catch (err) {
      console.error(err);
      alert("Failed ❌");
    }
  };
  {
    complaints.map((c) => (
      <div key={c.complaintId} className="border p-3 mb-2 rounded">
        <p>{c.complaintDescription}</p>
        <p>Status: {c.status}</p>
        <p>Date: {new Date(c.complaintDate).toLocaleDateString()}</p>
      </div>
    ))
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>
          <p className="mt-1 text-sm text-gray-500">File complaints about civic issues or service failures.</p>
        </div>
        <Button variant={showForm ? 'outline' : 'primary'} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'File a Complaint'}
        </Button>
      </div>

      {showForm && (
        <Card className="border-amber-100 bg-amber-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <AlertCircle className="w-5 h-5" />
              Submit a New Complaint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Complaint Title"
                placeholder="E.g., Missed Scheduled Collection"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                leftIcon={<FileText className="w-4 h-4" />}
                required
              />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors min-h-[120px]"
                  placeholder="Provide details about the issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 text-white">
                  Submit Complaint
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Complaints List */}
      <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Your Past Complaints</h3>
      <div className="grid grid-cols-1 gap-4">
        {complaints.map((complaint) => (
          <Card key={complaint.complaintId} className="overflow-hidden">
            <div className={`h-1.5 w-full ${complaint.status === 'Resolved' ? 'bg-green-500' : 'bg-amber-500'
              }`}></div>

            <CardContent className="p-5">
              <div className="flex justify-between mb-2">
                <h4 className="font-bold text-gray-900">
                  Complaint
                </h4>

                <span className="text-sm font-medium">
                  {complaint.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3">
                {complaint.complaintDescription}
              </p>

              <div className="text-xs text-gray-500">
                Filed on {new Date(complaint.complaintDate).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
