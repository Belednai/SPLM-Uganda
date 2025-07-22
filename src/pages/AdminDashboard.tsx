import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  DollarSign, 
  FileText, 
  Download, 
  Search,
  Filter,
  Printer,
  UserCheck,
  TrendingUp,
  CreditCard,
  IdCard,
  BarChart3,
  Settings,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  LogOut,
  Database,
  Loader2,
  Plus,
  RefreshCw
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalMembers: 0,
    newThisMonth: 0,
    totalRevenue: "UGX 0",
    pendingPayments: 0,
    activeMembers: 0,
    idsPrinted: 0,
    idsReadyForPickup: 0,
    pendingIdProcessing: 0
  });
  const [members, setMembers] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('splm_admin_token');
    if (!token) {
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API calls
      // const response = await fetch('/api/admin/dashboard');
      // const data = await response.json();
      // setStats(data.stats);
      // setMembers(data.members);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Dashboard Loaded",
        description: "Admin dashboard data refreshed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error Loading Data",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('splm_admin_token');
    localStorage.removeItem('splm_admin_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/admin/login');
  };

  const handleProcessId = async (memberId: string) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/admin/process-id/${memberId}`, { method: 'POST' });
      
      toast({
        title: "ID Processing Initiated",
        description: `Processing ID for member ${memberId}. This will take 2-3 business days.`,
      });
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process ID. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleMarkReadyForPickup = async (memberId: string) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/admin/mark-ready/${memberId}`, { method: 'POST' });
      
      toast({
        title: "ID Ready for Pickup",
        description: `Member ${memberId} has been notified via SMS that their ID is ready for collection.`,
      });
    } catch (error) {
      toast({
        title: "Update Error",
        description: "Failed to mark ID as ready. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleMarkCollected = async (memberId: string) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/admin/mark-collected/${memberId}`, { method: 'POST' });
      
      toast({
        title: "ID Collection Recorded",
        description: `ID collection has been recorded for member ${memberId}.`,
      });
    } catch (error) {
      toast({
        title: "Update Error",
        description: "Failed to record collection. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBulkPrint = () => {
    toast({
      title: "Print Feature",
      description: "Bulk print functionality will be implemented with backend integration.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Feature",
      description: "Data export functionality will be implemented with backend integration.",
    });
  };

  const handleSendNotifications = () => {
    toast({
      title: "Notification Feature",
      description: "SMS notification system will be implemented with backend integration.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Logout */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Admin <span className="text-primary">Dashboard</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage SPLM Uganda Chapter members, payments, and ID processing
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={fetchDashboardData} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                    <p className="text-2xl font-bold text-foreground">
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.totalMembers.toLocaleString()}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                    <p className="text-2xl font-bold text-secondary">
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : `+${stats.newThisMonth}`}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-lg font-bold text-accent">
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.totalRevenue}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                    <p className="text-2xl font-bold text-destructive">
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.pendingPayments}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-destructive" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Processing</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.pendingIdProcessing}
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Ready for Pickup</p>
                    <p className="text-2xl font-bold text-green-600">
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.idsReadyForPickup}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">IDs Collected</p>
                    <p className="text-2xl font-bold text-secondary">
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.idsPrinted.toLocaleString()}
                    </p>
                  </div>
                  <IdCard className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                    <p className="text-2xl font-bold text-primary">
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.activeMembers.toLocaleString()}
                    </p>
                  </div>
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="id-processing" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="id-processing">ID Processing</TabsTrigger>
              <TabsTrigger value="members">All Members</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="id-processing" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>ID Processing & Pickup Management</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={handleSendNotifications}>
                        <MessageSquare className="w-4 h-4" />
                        Send Pickup Notifications
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filter */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search members..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-64">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All ID Statuses</SelectItem>
                        <SelectItem value="pending_processing">Pending Processing</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="ready_for_pickup">Ready for Pickup</SelectItem>
                        <SelectItem value="collected">Collected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Empty State or Loading */}
                  {isLoading ? (
                    <div className="text-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Loading member data...</p>
                    </div>
                  ) : members.length === 0 ? (
                    <div className="text-center py-12">
                      <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Members Found</h3>
                      <p className="text-muted-foreground mb-4">
                        No members are currently registered in the system.
                      </p>
                      <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Member
                      </Button>
                    </div>
                  ) : (
                    /* Table would go here when data is available */
                    <div className="text-center py-12">
                      <Table className="hidden">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>ID Status</TableHead>
                            <TableHead>Processed Date</TableHead>
                            <TableHead>Notifications</TableHead>
                            <TableHead>Admin Notes</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {/* Table rows would be populated here */}
                        </TableBody>
                      </Table>
                      <p className="text-muted-foreground">
                        Member data will appear here when the backend API is connected.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Member Management</h3>
                    <p className="text-muted-foreground mb-4">
                      View and manage all registered members. Data will be loaded from the backend API.
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Data
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Members
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Payment Tracking</h3>
                    <p className="text-muted-foreground mb-4">
                      Monitor payment status, pending payments, and revenue tracking.
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Payment Reports
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Payments
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Generate reports on membership growth, revenue, and ID processing metrics.
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                      <Button variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        Monthly Summary
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Configuration</h3>
                    <p className="text-muted-foreground mb-4">
                      Configure system settings, notification preferences, and admin permissions.
                    </p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        General Settings
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Notification Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard; 