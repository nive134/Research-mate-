import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenOnboarding: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onOpenOnboarding,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const [editName, setEditName] = useState(profile.name);
  const [editTitle, setEditTitle] = useState(profile.title);
  const [editInstitution, setEditInstitution] = useState(profile.institution);

  const handleToggleSync = () => {
    onUpdateProfile({
      ...profile,
      syncActive: !profile.syncActive,
    });
  };

  const handleToggleAlert = (id: string) => {
    const updatedSettings = profile.alertSettings.map((as) =>
      as.id === id ? { ...as, enabled: !as.enabled } : as
    );
    onUpdateProfile({
      ...profile,
      alertSettings: updatedSettings,
    });
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      onUpdateProfile({
        ...profile,
        researchInterests: [...profile.researchInterests, newInterest.trim()],
      });
      setNewInterest('');
      setShowInterestModal(false);
    }
  };

  const handleRemoveInterest = (interest: string) => {
    onUpdateProfile({
      ...profile,
      researchInterests: profile.researchInterests.filter(
        (i) => i !== interest
      ),
    });
  };

  const handleSaveProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name: editName,
      title: editTitle,
      institution: editInstitution,
    });
    setShowEditModal(false);
  };

  return (
    <div className="flex flex-col w-full pb-32 pt-16 bg-[#faf9f7] min-h-screen">
      <div className="px-5 pt-4 flex flex-col gap-6">
        {/* Profile Card Header */}
        <section className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#041627]/10 flex flex-col items-center text-center relative overflow-hidden">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-3 ring-4 ring-[#041627]/10 shadow-md">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="font-headline text-2xl font-bold text-[#1a1c1b]">
            {profile.name}
          </h1>
          <p className="text-xs text-[#44474c] mt-0.5">
            {profile.title} • {profile.department}
          </p>
          <span className="text-xs font-semibold text-[#001e78] mt-1">
            {profile.institution}
          </span>

          <button
            onClick={() => setShowEditModal(true)}
            className="mt-4 bg-[#efeeec] text-[#1a1c1b] px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#e3e2e0] transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            <span>Edit Profile</span>
          </button>
        </section>

        {/* University Sync Card */}
        <section className="bg-[#ffffff] rounded-2xl p-5 shadow-sm border border-[#041627]/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#001e78]/10 text-[#001e78] flex items-center justify-center">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1a1c1b]">
                Institutional Library Sync
              </span>
              <span className="text-[11px] text-[#44474c]">
                {profile.syncActive ? 'Active • Stanford University' : 'Sync Inactive'}
              </span>
            </div>
          </div>

          <button
            onClick={handleToggleSync}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              profile.syncActive ? 'bg-[#001e78]' : 'bg-[#c4c6cd]'
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                profile.syncActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </section>

        {/* Research Interests */}
        <section className="bg-[#ffffff] rounded-2xl p-5 shadow-sm border border-[#041627]/10 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-bold text-[#041627] uppercase tracking-wider">
              Research Interests
            </h2>
            <button
              onClick={() => setShowInterestModal(true)}
              className="text-xs text-[#001e78] font-bold hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Topic
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.researchInterests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efeeec] text-[#1a1c1b] text-xs font-semibold group"
              >
                <span>{interest}</span>
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className="text-[#74777d] hover:text-[#ba1a1a] transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* Alert Settings */}
        <section className="bg-[#ffffff] rounded-2xl p-5 shadow-sm border border-[#041627]/10 flex flex-col gap-3">
          <h2 className="text-xs font-bold text-[#041627] uppercase tracking-wider">
            Alert Settings
          </h2>

          <div className="flex flex-col gap-3">
            {profile.alertSettings.map((as) => (
              <div
                key={as.id}
                className="flex items-center justify-between pb-2 border-b border-[#efeeec] last:border-none last:pb-0"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#1a1c1b]">
                    {as.label}
                  </span>
                  <span className="text-[10px] text-[#74777d]">
                    {as.sublabel}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleAlert(as.id)}
                  className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                    as.enabled ? 'bg-[#001e78]' : 'bg-[#c4c6cd]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                      as.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Preferences */}
        <section className="bg-[#ffffff] rounded-2xl p-5 shadow-sm border border-[#041627]/10 flex flex-col gap-3">
          <h2 className="text-xs font-bold text-[#041627] uppercase tracking-wider">
            Preferences & Citation Style
          </h2>

          <div className="flex justify-between items-center py-1">
            <span className="text-xs text-[#1a1c1b] font-medium">
              Preferred Citation Style
            </span>
            <span className="text-xs font-bold text-[#001e78] bg-[#001e78]/10 px-2.5 py-1 rounded-lg">
              {profile.preferences.citationStyle}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-t border-[#efeeec]">
            <span className="text-xs text-[#1a1c1b] font-medium">Theme</span>
            <span className="text-xs font-bold text-[#44474c] bg-[#efeeec] px-2.5 py-1 rounded-lg">
              Light Warm Neutral
            </span>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={onOpenOnboarding}
            className="w-full py-3 bg-[#efeeec] text-[#041627] rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#e3e2e0] transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              info
            </span>
            <span>View App Onboarding Tour</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-[#faf9f7] w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#e3e2e0] pb-3">
              <h3 className="font-headline text-lg font-bold text-[#041627]">
                Edit Researcher Profile
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#efeeec] text-[#44474c]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfileSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-[#041627] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-white border border-[#c4c6cd] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#041627]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#041627] block mb-1">
                  Title & Department
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-white border border-[#c4c6cd] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#041627]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#041627] block mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  value={editInstitution}
                  onChange={(e) => setEditInstitution(e.target.value)}
                  className="w-full bg-white border border-[#c4c6cd] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#041627]"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3 bg-[#041627] text-white rounded-xl text-xs font-semibold hover:bg-[#1a2b3c] transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Topic Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-[#faf9f7] w-full max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#e3e2e0] pb-2">
              <h3 className="font-headline text-base font-bold text-[#041627]">
                Add Research Topic
              </h3>
              <button
                onClick={() => setShowInterestModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#efeeec] text-[#44474c]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="e.g. Brain-Computer Interfaces"
                className="w-full bg-white border border-[#c4c6cd] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#041627]"
              />

              <button
                onClick={handleAddInterest}
                className="w-full py-2.5 bg-[#041627] text-white rounded-xl text-xs font-semibold hover:bg-[#1a2b3c] transition-colors"
              >
                Add Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
