import React from 'react';

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  read: boolean;
  category: 'logistics' | 'pricing' | 'compliance';
  icon: string;
}

interface NotificationsModalProps {
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose, onNavigate }) => {
  const notifications: NotificationItem[] = [
    {
      id: 'notif-1',
      title: 'Collector Ramesh Kumar (#104) assigned to #RCV-8942 for tomorrow at 10:30 AM.',
      time: '15 mins ago',
      read: false,
      category: 'logistics',
      icon: 'local_shipping'
    },
    {
      id: 'notif-2',
      title: 'Commodity Index refreshed: Pure Copper benchmark increased by +2.4% to ₹720.00/kg.',
      time: '08:00 AM',
      read: false,
      category: 'pricing',
      icon: 'trending_up'
    },
    {
      id: 'notif-3',
      title: 'Statutory Form-6 Hazardous Destruction certificate generated for Lot #EW-1077.',
      time: 'Yesterday',
      read: true,
      category: 'compliance',
      icon: 'verified'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-on-background/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-outline-variant/40 mt-2 mr-4">
        <div className="p-4 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
            <h3 className="font-bold text-sm text-on-surface">System &amp; Operations Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-surface-container flex items-center justify-center text-outline"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="divide-y divide-outline-variant/20 max-h-96 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.category === 'logistics') onNavigate('pickup-tracking');
                else if (n.category === 'pricing') onNavigate('scrap-price-estimator');
                else onNavigate('e-waste-requests');
                onClose();
              }}
              className={`p-4 hover:bg-surface-container-low cursor-pointer transition-colors flex items-start gap-3 ${
                !n.read ? 'bg-secondary-container/20' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-on-surface leading-snug">{n.title}</p>
                <span className="text-[10px] text-outline font-mono mt-1 block">{n.time}</span>
              </div>
              {!n.read && <span className="w-2 h-2 rounded-full bg-primary mt-1 shrink-0"></span>}
            </div>
          ))}
        </div>

        <div className="p-3 bg-surface-container-low border-t border-outline-variant/30 text-center">
          <button
            onClick={onClose}
            className="text-xs text-primary font-bold hover:underline"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};
