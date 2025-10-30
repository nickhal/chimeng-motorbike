"use client";

import { useState, FormEvent } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function BookingForm() {
  const [date, setDate] = useState<Date>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [bikeType, setBikeType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const dateStr = date ? format(date, "PPP") : "Not specified";

    const message = `
Hello, I'd like to rent a motorbike:

Name: ${firstName} ${lastName}
Phone: ${phone}
Preferred Date: ${dateStr}
Preferred Time: ${preferredTime || "Not specified"}
Bike Type: ${bikeType || "Not specified"}
Additional Info: ${description || "None"}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6282247986694?text=${encodedMessage}`, "_blank");
  };

  return (
    <form
      className="space-y-6 needle-cursor"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="first-name"
            className="text-brand-black font-medium"
          >
            First Name
          </Label>
          <Input
            id="first-name"
            placeholder="Enter your first name"
            className="border-brand-black/20 focus-visible:ring-brand-green"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="last-name"
            className="text-brand-black font-medium"
          >
            Last Name
          </Label>
          <Input
            id="last-name"
            placeholder="Enter your last name"
            className="border-brand-black/20 focus-visible:ring-brand-green"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="phone"
          className="text-brand-black font-medium"
        >
          Phone Number
        </Label>
        <Input
          id="phone"
          placeholder="Enter your phone number"
          className="border-brand-black/20 focus-visible:ring-brand-green"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-brand-black font-medium">Preferred Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-brand-black/20",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="rounded-md border"
              disabled={(date) => date < new Date()}
              fromMonth={new Date()}
              showOutsideDays={false}
              fixedWeeks
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label className="text-brand-black font-medium">Preferred Time</Label>
        <Select onValueChange={setPreferredTime}>
          <SelectTrigger className="border-brand-black/20 focus-visible:ring-brand-green">
            <SelectValue placeholder="Select a time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
            <SelectItem value="12:00 PM">12:00 PM</SelectItem>
            <SelectItem value="1:00 PM">1:00 PM</SelectItem>
            <SelectItem value="2:00 PM">2:00 PM</SelectItem>
            <SelectItem value="3:00 PM">3:00 PM</SelectItem>
            <SelectItem value="4:00 PM">4:00 PM</SelectItem>
            <SelectItem value="5:00 PM">5:00 PM</SelectItem>
            <SelectItem value="6:00 PM">6:00 PM</SelectItem>
            <SelectItem value="7:00 PM">7:00 PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-brand-black font-medium">Bike Type</Label>
        <Select onValueChange={setBikeType}>
          <SelectTrigger className="border-brand-black/20 focus-visible:ring-brand-green">
            <SelectValue placeholder="Select bike type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Honda Scoopy">Honda Scoopy</SelectItem>
            <SelectItem value="Honda Vario">Honda Vario</SelectItem>
            <SelectItem value="Yamaha NMax">Yamaha NMax</SelectItem>
            <SelectItem value="Any Available">Any Available</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-brand-black font-medium"
        >
          Additional Information
        </Label>
        <Textarea
          id="description"
          placeholder="Rental duration (daily/weekly/monthly), delivery preference, or any special requests"
          rows={4}
          className="border-brand-black/20 focus-visible:ring-brand-green"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-brand-green hover:bg-brand-green/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105 pulse-glow"
      >
        Contact via WhatsApp
      </Button>
    </form>
  );
}
