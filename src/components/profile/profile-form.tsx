'use client';

import { useEffect, useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ProfileForm() {
  const auth = useAuth();
  const firestore = useFirestore();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    bio: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const user = auth?.currentUser;

  useEffect(() => {
    if (!user || !firestore) return;

    const loadProfile = async () => {
      const ref = doc(firestore, 'users', user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setForm({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phone: data.phone || '',
          dob: data.dob || '',
          bio: data.bio || '',
          street: data.address?.street || '',
          city: data.address?.city || '',
          state: data.address?.state || '',
          zip: data.address?.zip || '',
        });
      }
    };

    loadProfile();
  }, [user, firestore]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !firestore) return;

    setLoading(true);

    try {
      const ref = doc(firestore, 'users', user.uid);

      await updateDoc(ref, {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        dob: form.dob,
        bio: form.bio,
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          zip: form.zip,
        },
        updatedAt: new Date().toISOString(),
      });

      alert('Profile saved');
    } catch (err) {
      console.error(err);
      alert('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <Input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
        <Input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
      </div>

      <Input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <Input name="dob" type="date" value={form.dob} onChange={handleChange} />
      <Textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} />

      <Input name="street" placeholder="Street" value={form.street} onChange={handleChange} />
      <div className="grid grid-cols-3 gap-4">
        <Input name="city" placeholder="City" value={form.city} onChange={handleChange} />
        <Input name="state" placeholder="State" value={form.state} onChange={handleChange} />
        <Input name="zip" placeholder="ZIP" value={form.zip} onChange={handleChange} />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  );
}
