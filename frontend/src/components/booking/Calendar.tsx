import { FC } from 'react'

interface CalendarProps {
  onDateSelect: (date: Date) => void
  selectedDate: Date | null
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export const Calendar: FC<CalendarProps> = ({ onDateSelect, selectedDate }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);

  // Build calendar grid
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null); // empty cells for days before the 1st
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-4">Velg dato</h2>
      <div className="grid grid-cols-7 gap-2 mb-4 text-center text-dark">
        {['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'].map((d) => (
          <div key={d} className="font-semibold">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d, idx) => {
          if (d === null) return <div key={idx} />;
          const dateObj = new Date(year, month, d);
          const isSelected = selectedDate &&
            dateObj.toDateString() === selectedDate.toDateString();
          const isToday = dateObj.toDateString() === today.toDateString();

          let buttonClasses = "p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200";
          if (isSelected) {
            buttonClasses += " bg-secondary text-white font-bold";
          } else if (isToday) {
            buttonClasses += " bg-light text-primary font-semibold";
          } else {
            buttonClasses += " text-dark hover:bg-gray-100";
          }

          return (
            <button
              key={d}
              className={buttonClasses}
              onClick={() => onDateSelect(dateObj)}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  )
}