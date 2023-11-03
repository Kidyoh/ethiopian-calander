import { EtDatetime, ETC, BahireHasab, ConvertToEthiopic } from 'abushakir';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleLeft, faAngleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';


export default function App() {
  const now: EtDatetime = new EtDatetime();
  console.log(now);

  // Get the current Gregorian date
  const currentDate = new Date();

  const currentEthiopianDate = new EtDatetime(currentDate.getTime());
  console.log("The current ethiopian date is" + currentEthiopianDate);

  const [ethiopianCalendar, setEthiopianCalendar] = useState(new ETC(currentEthiopianDate.year, currentEthiopianDate.month, currentEthiopianDate.day));



  ethiopianCalendar.monthDays(true, true);
  ethiopianCalendar.monthDays();


  const nextmonth = ethiopianCalendar.nextMonth;
  const previousmonth = ethiopianCalendar.prevMonth;
  const monthDays = ethiopianCalendar.monthDays(true, true);

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

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ethiopianDate, setEthiopianDate] = useState('');
  const [gregorianDate, setGregorianDate] = useState('');

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


  return (
    <div className='m-0 flex place-items-center min-w-fit min-h-[100vh] items-center justify-center '>
      <div >
        <div style={{ fontSize: '1em', margin: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} onClick={handlePrevYear} style={{ fontSize: '1em', cursor: 'pointer', padding: '30px' }} />
          <FontAwesomeIcon icon={faAngleLeft} onClick={handlePrevMonth} style={{ fontSize: '1em', cursor: 'pointer' , padding:"30px"}} />
          <h1 style={{ color: "white", flex: 1, textAlign: 'center', margin: '0' }}>{ethiopianMonths[ethiopianCalendar.month - 1]}</h1>
          <FontAwesomeIcon icon={faAngleRight}  size="xl"onClick={handleNextMonth} style={{ fontSize: '1em', cursor: 'pointer', padding: '30px'}} />
          <FontAwesomeIcon icon={faAngleDoubleRight} onClick={handleNextYear} style={{ fontSize: '1em', cursor: 'pointer', padding:"30px" }} />
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
    style={{
      border: '1px', 
      padding: '10px', 
      color: "black", 
      fontWeight: 'bold', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: day[2] === currentEthiopianDate ? 'black' : 'transparent'
    }}
  >
    {day[2]}
  </div>
))}
        </div>
      </div>
      <div className='card'>
        <div className='card-container '>
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
          <p>Selected Gregorian date: {gregorianDate}</p>
          <p>Equivalent Ethiopian date: {ethiopianDate}</p>
        </div>
      </div>

    </div>
  );
}