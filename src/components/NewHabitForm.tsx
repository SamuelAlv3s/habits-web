import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent } from "react";
import { useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState<string>("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) return;

    api
      .post("/habits", {
        title,
        weekDays,
      })
      .then((response) => {
        console.log(response.data);

        setTitle("");
        setWeekDays([]);
      });
  }

  function handleToggleWeekDay(day: number) {
    const alreadySelected = weekDays.includes(day);

    if (alreadySelected) {
      const filteredWeekDays = weekDays.filter((item) => item !== day);
      setWeekDays(filteredWeekDays);
    } else {
      setWeekDays([...weekDays, day]);
    }
  }

  return (
    <form
      onSubmit={(event) => createNewHabit(event)}
      className="w-full flex flex-col mt-6"
    >
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekDays.map((day, index) => {
          return (
            <Checkbox.Root
              key={day}
              checked={weekDays.includes(index)}
              className="flex items-center gap-2 group outline-none"
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="w-8 h-8 rounded-lg flex justify-center items-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">{day}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-background"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
