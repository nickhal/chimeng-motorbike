"use client";

import { useState } from "react";
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

  return (
    <form className="space-y-6 needle-cursor">
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
            className="border-brand-black/20 focus-visible:ring-brand-red"
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
            className="border-brand-black/20 focus-visible:ring-brand-red"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-brand-black font-medium"
        >
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="border-brand-black/20 focus-visible:ring-brand-red"
        />
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
          className="border-brand-black/20 focus-visible:ring-brand-red"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-brand-black font-medium">Preferred Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
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
        <Select>
          <SelectTrigger className="border-brand-black/20 focus-visible:ring-brand-red">
            <SelectValue placeholder="Select a time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9am">9:00 AM</SelectItem>
            <SelectItem value="10am">10:00 AM</SelectItem>
            <SelectItem value="11am">11:00 AM</SelectItem>
            <SelectItem value="12pm">12:00 PM</SelectItem>
            <SelectItem value="1pm">1:00 PM</SelectItem>
            <SelectItem value="2pm">2:00 PM</SelectItem>
            <SelectItem value="3pm">3:00 PM</SelectItem>
            <SelectItem value="4pm">4:00 PM</SelectItem>
            <SelectItem value="5pm">5:00 PM</SelectItem>
            <SelectItem value="6pm">6:00 PM</SelectItem>
            <SelectItem value="7pm">7:00 PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-brand-black font-medium">Tattoo Type</Label>
        <Select>
          <SelectTrigger className="border-brand-black/20 focus-visible:ring-brand-red">
            <SelectValue placeholder="Select tattoo type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fineline">Fineline Tattoo</SelectItem>
            <SelectItem value="single">Single Piece</SelectItem>
            <SelectItem value="sleeve">Sleeve Piece</SelectItem>
            <SelectItem value="fullback">Full Back</SelectItem>
            <SelectItem value="custom">Custom Design</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-brand-black font-medium"
        >
          Tattoo Description
        </Label>
        <Textarea
          id="description"
          placeholder="Please describe your tattoo idea, size, placement, and any reference images you have"
          rows={4}
          className="border-brand-black/20 focus-visible:ring-brand-red"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white uppercase tracking-wider font-medium transition-transform hover:scale-105 pulse-glow"
      >
        Submit Booking Request
      </Button>
    </form>
  );
}
