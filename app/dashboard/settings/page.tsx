"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { HoursEditor } from "@/components/dashboard/HoursEditor";
import { useWorkspace } from "@/lib/store";
import type { OpeningHoursDay } from "@/lib/types";

export default function VenueSettingsPage() {
  const { restaurant, updateRestaurant } = useWorkspace();

  const [name, setName] = useState(restaurant.name);
  const [tagline, setTagline] = useState(restaurant.tagline);
  const [address, setAddress] = useState(restaurant.address);
  const [city, setCity] = useState(restaurant.city);
  const [phone, setPhone] = useState(restaurant.phone);
  const [email, setEmail] = useState(restaurant.email);
  const [website, setWebsite] = useState(restaurant.website);
  const [isPublished, setIsPublished] = useState(restaurant.isPublished);
  const [hours, setHours] = useState<OpeningHoursDay[]>(restaurant.openingHours);
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateRestaurant({
      name,
      tagline,
      address,
      city,
      phone,
      email,
      website,
      isPublished,
      openingHours: hours,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-paper">Venue settings</h1>
        <p className="mt-1 text-sm text-muted">
          Keep your restaurant details up to date. Guests see this information on your public
          menu page.
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-8">
        <Card>
          <CardBody className="flex flex-col gap-5">
            <h2 className="text-lg font-semibold text-paper">Restaurant details</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Restaurant name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Tagline"
                name="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="A short line describing your place"
              />
            </div>

            <Textarea
              label="Address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="City"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Contact email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Website"
                name="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://"
              />
            </div>

            <div className="border-t border-line pt-5">
              <Toggle
                checked={isPublished}
                onChange={setIsPublished}
                label="Publish public menu"
                description="When off, your public menu page shows as temporarily unavailable to guests."
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-semibold text-paper">Opening hours</h2>
              <p className="mt-1 text-sm text-muted">
                Shown on your public menu so guests know when you are open.
              </p>
            </div>
            <HoursEditor value={hours} onChange={setHours} />
          </CardBody>
        </Card>

        <div className="flex items-center gap-4">
          <Button type="submit">Save changes</Button>
          {saved && <span className="text-sm text-accent-soft">Settings saved.</span>}
        </div>
      </form>
    </div>
  );
}
