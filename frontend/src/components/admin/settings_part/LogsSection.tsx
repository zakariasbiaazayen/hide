// ========================================
// ADMIN LOGS SECTION COMPONENT
// ========================================

import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Download, Filter, X } from 'lucide-react';
import type { AdminLog, LogsFilter } from '../../../types/settings.types';
import { LogsService, MockDataService } from '../../../services/services';
import { Input, Button, Card, EmptyState, LoadingSpinner } from './UIComponents';

export const LogsSection: React.FC = () => {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<LogsFilter>({
    email: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
  });
  const [totalLogs, setTotalLogs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch logs on mount and when filters change
  useEffect(() => {
    fetchLogs();
  }, [filters.page, filters.limit]);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      // Use mock service for development
      const response = await MockDataService.mockFetchLogs(filters);
      
      // For production:
      // const response = await LogsService.fetchLogs(filters);

      setLogs(response.logs);
      setTotalLogs(response.total);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Fetch logs error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setFilters({ ...filters, page: 1 });
    fetchLogs();
  };

  const handleClearFilters = () => {
    setFilters({
      email: '',
      startDate: '',
      endDate: '',
      page: 1,
      limit: 10,
    });
  };

  const handleExport = async () => {
    try {
      // For production:
      // const blob = await LogsService.exportLogs(filters);
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `admin-logs-${new Date().toISOString()}.csv`;
      // a.click();
      
      alert('Export functionality will download CSV file in production');
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const hasActiveFilters = filters.email || filters.startDate || filters.endDate;

  return (
    <Card
      title="Admin Login Logs"
      description="Monitor all admin panel access activity"
      action={
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExport}
          leftIcon={<Download className="w-4 h-4" />}
        >
          Export CSV
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search by email..."
              value={filters.email}
              onChange={(e) => setFilters({ ...filters, email: e.target.value })}
              leftIcon={<Search className="w-4 h-4" />}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          
          <Input
            type="date"
            placeholder="Start date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
          
          <Input
            type="date"
            placeholder="End date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>

        {/* Filter Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={handleSearch}
            leftIcon={<Filter className="w-4 h-4" />}
          >
            Apply Filters
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              leftIcon={<X className="w-4 h-4" />}
            >
              Clear Filters
            </Button>
          )}
          
          <div className="ml-auto text-sm text-slate-400">
            Showing {logs.length} of {totalLogs} logs
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <LoadingSpinner />
        ) : logs.length === 0 ? (
          <EmptyState
            icon={<Search className="w-8 h-8" />}
            title="No logs found"
            description={
              hasActiveFilters
                ? 'No logs match your search criteria. Try adjusting your filters.'
                : 'No admin login activity recorded yet.'
            }
            action={
              hasActiveFilters ? (
                <Button variant="secondary" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">
                    Member
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">
                    IP Address
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr
                    key={log.id}
                    className={`
                      border-b border-slate-800 hover:bg-slate-700/30 transition-colors
                      ${index === logs.length - 1 ? 'border-b-0' : ''}
                    `}
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm font-medium text-white">{log.memberName}</p>
                        <p className="text-xs text-slate-400">{log.memberEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span>{log.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <code className="text-sm text-slate-400 bg-slate-900/50 px-2 py-1 rounded">
                        {log.ipAddress}
                      </code>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span>
                          {new Date(log.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-300">{log.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && logs.length > 0 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <div className="text-sm text-slate-400">
              Page {filters.page} of {totalPages}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ ...filters, page: Math.max(1, (filters.page || 1) - 1) })}
                disabled={filters.page === 1}
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setFilters({ ...filters, page })}
                      className={`
                        px-3 py-1.5 text-sm rounded-lg transition-colors
                        ${
                          filters.page === page
                            ? 'bg-cyan-600 text-white'
                            : 'text-slate-400 hover:bg-slate-700'
                        }
                      `}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ ...filters, page: Math.min(totalPages, (filters.page || 1) + 1) })}
                disabled={filters.page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
