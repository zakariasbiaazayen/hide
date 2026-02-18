// ========================================
// EMAIL SECTION COMPONENT
// ========================================

import React, { useState } from 'react';
import { Send, Users, Mail, Image as ImageIcon } from 'lucide-react';
import type { EmailCategory, EmailPayload } from '../../../types/settings.types';
import { EmailService, MockDataService } from '../../../services/services';
import { Button, Input, Textarea, Select, Card, Alert, FileUpload } from './UIComponents';

export const EmailSection: React.FC = () => {
  const [formData, setFormData] = useState<EmailPayload>({
    category: 'members',
    subject: '',
    content: '',
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const categoryOptions = [
    { value: 'members', label: 'Members (Admin Panel Users)' },
    { value: 'users', label: 'Users (Event Participants)' },
    { value: 'newsletter_subscribers', label: 'Newsletter Subscribers' },
  ];

  const recipientCounts: Record<EmailCategory, number> = {
    members: 245,
    users: 1823,
    newsletter_subscribers: 5420,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    // Validation
    if (!formData.subject.trim()) {
      setAlert({ type: 'error', message: 'Please enter an email subject' });
      return;
    }

    if (!formData.content.trim()) {
      setAlert({ type: 'error', message: 'Please enter email content' });
      return;
    }

    setIsLoading(true);

    try {
      // Use mock service for development, replace with EmailService.sendEmail for production
      const response = await MockDataService.mockSendEmail(formData);
      
      // Alternatively for production:
      // const response = await EmailService.sendEmail(formData);

      if (response.success) {
        setAlert({
          type: 'success',
          message: `Email sent successfully to ${response.sentCount} recipients!`,
        });
        
        // Reset form
        setFormData({
          category: 'members',
          subject: '',
          content: '',
          image: null,
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Send email error:', error);
      setAlert({
        type: 'error',
        message: 'Failed to send email. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      title="Send Email Campaign"
      description="Send targeted emails to different user categories"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Alert */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Category Selection */}
        <div>
          <Select
            label="Recipient Category"
            options={categoryOptions}
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value as EmailCategory })
            }
          />
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
            <Users className="w-4 h-4" />
            <span>
              Approximately <span className="font-semibold text-cyan-400">
                {recipientCounts[formData.category].toLocaleString()}
              </span> recipients
            </span>
          </div>
        </div>

        {/* Email Subject */}
        <Input
          label="Email Subject"
          placeholder="Enter email subject..."
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />

        {/* Email Content */}
        <Textarea
          label="Email Content"
          placeholder="Write your email content here..."
          rows={8}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          helperText="You can use basic HTML tags for formatting"
          required
        />

        {/* Image Upload */}
        <FileUpload
          label="Attach Image (Optional)"
          accept="image/png,image/jpeg,image/jpg"
          currentFile={formData.image}
          onChange={(file) => setFormData({ ...formData, image: file })}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            leftIcon={<Send className="w-4 h-4" />}
            className="flex-1"
          >
            {isLoading ? 'Sending...' : 'Send Email'}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={() => {
              setFormData({
                category: 'members',
                subject: '',
                content: '',
                image: null,
              });
              setAlert(null);
            }}
            disabled={isLoading}
          >
            Clear
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <ImageIcon className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-sm text-cyan-300">
              <p className="font-semibold mb-1">Email Delivery Notes</p>
              <ul className="list-disc list-inside space-y-1 text-cyan-400/80">
                <li>Emails are sent asynchronously in the background</li>
                <li>Large campaigns may take several minutes to complete</li>
                <li>Recipients can unsubscribe using the link in the footer</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};
