import React from 'react';
import { ResearchAlert } from '../types';

interface NotificationsModalProps {
  alerts: ResearchAlert[];
  onClose: () => void;
  onClearAll: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  alerts,
  onClose,
  onClearAll,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-[#faf9f7] w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#e3e2e0] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#041627]">
              notifications_active
            </span>
            <h2 className="font-headline text-lg font-semibold text-[#041627]">
              Research Alerts & Notifications
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#efeeec] text-[#44474c]"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {alerts.length === 0 ? (
            <p className="text-sm text-[#44474c] text-center py-6">
              No new notifications right now. You are all caught up!
            </p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-[#ffffff] rounded-xl p-4 flex gap-3 shadow-sm border border-[#041627]/10"
              >
                <div
                  className={`w-2 h-2 mt-2 rounded-full shrink-0 ${alert.badgeColor}`}
                />
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-xs font-semibold text-[#041627]">
                    {alert.title}
                  </span>
                  <p className="text-sm text-[#1a1c1b] leading-snug">
                    {alert.description}
                  </p>
                  <span className="text-xs text-[#74777d] mt-1">
                    {alert.meta}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {alerts.length > 0 && (
          <div className="flex justify-end pt-2">
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-[#041627] hover:underline"
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
