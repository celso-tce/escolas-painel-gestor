import React from 'react';
import { DateTime } from 'luxon';

type DateTextProps = {
  date: Date;
} & (
  {
    relative: true;
  }
  |
  {
    relative?: false;
    format?: string;
  }
);

const DateText: React.FC<DateTextProps> = (props) => {
  const dateTime = DateTime.fromJSDate(props.date);

  const formatted = props.relative
    ? dateTime.toRelative() ?? ''
    : dateTime.toFormat(props.format ?? 'dd/LL/yyyy');

  return (<>
    {formatted}
  </>);
};

export default React.memo(DateText);
