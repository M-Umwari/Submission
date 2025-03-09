import * as Yup from 'yup';

export const defaultTimeSlotSchema = Yup.object({
  from: Yup.date()
    .nullable()
    .required('Start time is required'),
  to: Yup.date()
    .nullable()
    .required('End time is required')
    .test('is-greater', 'End time must be greater than start time', function(value) {
      const { from } = this.parent;
      if (from && value) {
        return value > from;
      }
      return true;
    })
    .test('is-same-day', 'End time must be on the same day as start time', function(value) {
      const { from } = this.parent;
      if (from && value) {
        const startDate = new Date(from);
        const endDate = new Date(value);
        return startDate.toDateString() === endDate.toDateString(); 
      }
      return true;
    }),
});