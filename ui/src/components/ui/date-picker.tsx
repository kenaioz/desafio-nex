"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { DateRange } from "react-day-picker";

export function DatePicker() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-fit justify-between font-normal"
        >
          {date?.from ? (
            date.to ? (
              <>
                {date.from.toLocaleDateString("pt-BR")} -{" "}
                {date.to.toLocaleDateString("pt-BR")}
              </>
            ) : (
              date.from.toLocaleDateString("pt-BR")
            )
          ) : (
            "Selecione intervalo"
          )}
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          numberOfMonths={2}
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
