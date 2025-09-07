import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import { toast } from "react-toastify";
import { userAPI } from "../services/api";

interface UserProfile {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would call an API endpoint here
        // const response = await userAPI.getProfile();
        // setProfile(response.data);
        
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockProfile = {
          name: "John Doe",
          email: "john.doe@example.com"
        };
        
        setProfile(mockProfile);
        setName(mockProfile.name);
        setEmail(mockProfile.email);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      // Validate passwords if trying to change password
      if (newPassword) {
        if (!currentPassword) {
          toast.error("Current password is required");
          setUpdating(false);
          return;
        }
        
        if (newPassword !== confirmPassword) {
          toast.error("New passwords don't match");
          setUpdating(false);
          return;
        }
        
        if (newPassword.length < 8) {
          toast.error("Password must be at least 8 characters");
          setUpdating(false);
          return;
        }
      }
      
      // In a real implementation, you would call an API endpoint here
      // await userAPI.updateProfile({ name, email, currentPassword, newPassword });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setProfile(prev => prev ? { ...prev, name, email } : null);
      
      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-14 pb-20">
      <div className="mb-8 text-2xl">
        <Title text1="YOUR" text2="PROFILE" />
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="mt-6">
            <h3 className="mb-4 text-lg font-medium">Change Password</h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700 disabled:bg-gray-400"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;