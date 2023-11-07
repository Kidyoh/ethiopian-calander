import { EtDatetime, ETC, BahireHasab, ConvertToEthiopic } from 'abushakir';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleLeft, faAngleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import ReactSwitch from 'react-switch';

export default function App() {

  const currentDate = new Date();

  const currentEthiopianDate = new EtDatetime(currentDate.getTime());
  const [ethiopianCalendar, setEthiopianCalendar] = useState(new ETC(currentEthiopianDate.year, currentEthiopianDate.month, currentEthiopianDate.day));



  ethiopianCalendar.monthDays(true, true);
  ethiopianCalendar.monthDays();


  const nextmonth = ethiopianCalendar.nextMonth;
  const previousmonth = ethiopianCalendar.prevMonth;
  const monthDays = ethiopianCalendar.monthDays(true, true);
  const [isGeez, setIsGeez] = useState(false);

  console.log(nextmonth.monthDays(true, true));
  console.log(previousmonth.monthDays(true, true));


  let bh: BahireHasab = new BahireHasab(2016);
  bh.getEvangelist(true); // => ሉቃስ

  bh.getSingleBealOrTsom('ትንሳኤ'); // {month: ሚያዝያ, date: 20}

  bh.metkih


  const allFastings = bh.allAtswamat; // => List of All fasting and Movable holidays
  console.log(allFastings);


  const testNums: number[] = [1, 2, 10, 15, 20, 25, 78, 105, 333, 450, 600, 1000, 1001, 1010, 1056, 1200, 2013, 9999, 10000];

  for (const num of testNums) {
    console.log(ConvertToEthiopic(num));
  }


  const gregorian1: number = Date.now();
  const ethiopian1: EtDatetime = new EtDatetime(gregorian1);
  console.log(ethiopian1);

  const ethiopian: EtDatetime = new EtDatetime();
  const gregorian: Date = new Date(ethiopian.moment);
  console.log(gregorian);

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [ethiopianDate, setEthiopianDate] = useState('');
  const [gregorianDate, setGregorianDate] = useState('');
  // const [ethiopianNumber, setEthiopianNumber] = useState(''); 

  const ethiopianMonths = [
    'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
    'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'
  ];

  const gregorianMonths = [
    'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];


  const getEthiopianMonthName = (monthNumber: number) => {
    return ethiopianMonths[monthNumber - 1];
  };

  const getGregorianMonthName = (monthNumber: number) => {
    return gregorianMonths[monthNumber - 1];
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const ethiopian = new EtDatetime(date.getTime());
    setEthiopianDate(`${getEthiopianMonthName(ethiopian.month)}-${ethiopian.day}-${ethiopian.year}`);
    setGregorianDate(`${getGregorianMonthName(date.getMonth() + 1)}-${date.getDate()}-${date.getFullYear()}`);
  };

  const handleNextMonth = () => {
    setEthiopianCalendar(ethiopianCalendar.nextMonth);
  };
  const handleNextYear = () => {
    setEthiopianCalendar(ethiopianCalendar.nextYear)
  }

  const handlePrevMonth = () => {
    setEthiopianCalendar(ethiopianCalendar.prevMonth);
  };
  const handlePrevYear = () => {
    setEthiopianCalendar(ethiopianCalendar.prevYear)
  }
  const daysOfWeek = ['ሰኞ', 'ማግሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ', 'እሁድ'];

  const firstDayOfWeek = monthDays[0][3];
  const emptyDays = daysOfWeek.indexOf(firstDayOfWeek);

  const currentDateEthio = ConvertToEthiopic(currentEthiopianDate.day)

  const currentDay = currentDate.getDate(); // Get current day
  const currentMonth = currentDate.getMonth() + 1; // Get current month (Note: Month is 0-based)
  const currentYear = currentDate.getFullYear();


  const currentEthiopianDay = currentEthiopianDate.day;
  const currentEthiopianYear = currentEthiopianDate.year;



  const years = Array.from({ length: 100 }, (_, i) => 1970 + i);
  return (
    <div className='m-0 flex flex-wrap place-items-center min-w-fit min-h-[100vh] items-center justify-center '>
      <div >
        <div style={{ fontSize: '1em', margin: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} onClick={handlePrevYear} style={{ fontSize: '1em', cursor: 'pointer', padding: '30px' }} />
          <FontAwesomeIcon icon={faAngleLeft} onClick={handlePrevMonth} style={{ fontSize: '1em', cursor: 'pointer', padding: "30px" }} />
          <div>
            <select
              className="p-2 border border-white rounded-lg shadow-md"
              onChange={(e) => {
                const selectedMonth = parseInt(e.target.value);
                let selectedDay = ethiopianCalendar.day;
                if (selectedMonth === 13) {
                  const isLeapYear = ethiopianCalendar.year % 4 === 3; // Ethiopian leap year check
                  const pagumeDays = isLeapYear ? 6 : 5;
                  if (selectedDay > pagumeDays) {
                    selectedDay = pagumeDays; // adjust the day for Pagume
                  }
                }
                setEthiopianCalendar(new ETC(ethiopianCalendar.year, selectedMonth, selectedDay));
              }}
              value={ethiopianCalendar.month}
              style={{ backgroundColor: '#5A4AC2', color: 'white' }}
            >
              {ethiopianMonths.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="p-2 border border-white rounded-lg shadow-md"
              onChange={(e) => {
                const selectedYear = parseInt(e.target.value);
                setEthiopianCalendar(new ETC(selectedYear, ethiopianCalendar.month, ethiopianCalendar.day));
              }}
              value={ethiopianCalendar.year} // use the year from the ethiopianCalendar state
              style={{ backgroundColor: '#5A4AC2', color: 'white' }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>


          <FontAwesomeIcon icon={faAngleRight} size="xl" onClick={handleNextMonth} style={{ fontSize: '1em', cursor: 'pointer', padding: '30px' }} />
          <FontAwesomeIcon icon={faAngleDoubleRight} onClick={handleNextYear} style={{ fontSize: '1em', cursor: 'pointer', padding: "30px" }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', color: "black", borderRadius: '10px', backgroundColor: 'white' }}>
          {daysOfWeek.map((day, index) => (
            <div key={index} style={{ border: '1px', padding: '10px', borderRadius: '10px', fontWeight: 'bold', color: "#5A4AC2", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {day}
            </div>
          ))}
          {Array(emptyDays).fill(null).map((_, index) => (
            <div key={index} style={{ border: '1px', padding: '10px', color: "black", display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          ))}

          {monthDays.map((day, index) => (
            <div
              key={index}
              className={`p-2 text-black font-bold flex flex-col items-center justify-center ${day[2] === currentDateEthio && day[0] === currentEthiopianDate.year && day[1] === currentEthiopianDate.month
                ? `border border-blue-800 rounded-full shadow-lg`
                : 'bg-transparent'
                }`}
              title={
                day[2] === currentDateEthio && day[0] === currentEthiopianDate.year
                  ? `Today: ${currentYear}-${currentMonth}-${currentDay}
          \nEthiopian: ${currentEthiopianYear}-${ethiopianMonths[ethiopianCalendar.month - 1]}-${currentEthiopianDay}`


                  : ''
              }
            >
              {isGeez ? day[2] : index + 1}
            </div>
          ))}


        </div>
        <br />
        <div className=' flex items-center space-x-4'>
          <ReactSwitch
            onChange={() => setIsGeez(!isGeez)}
            checked={isGeez}
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
          />
          <span className={`text-black-700 font-medium`}>{isGeez ? 'Other Numbers' : 'Geez Numbers'}</span>
        </div>
      </div>
      <div className='border border-black bg-white p-5 shadow-md rounded-lg m-2'>
        <div className='max-w-xs mt-3'>
          <h1 className='text-purple-800 text-2xl pb-2'>Ethiopian Date Convertor</h1>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className='w-4/5 bg-white text-black border-radius-5'
          />


          <p className='text-black font-bold text-sm my-2'>Selected Gregorian date: {gregorianDate}</p>
          <p className='text-black font-bold text-sm my-2'>Equivalent Ethiopian date: {ethiopianDate}</p>
        </div>
      </div>

    </div>
  );
}