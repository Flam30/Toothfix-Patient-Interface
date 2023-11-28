// Here, we manually define the types that will be returned from the database. 
// For example, the slots table has the following types:

export type Slots = {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    // In TypeScript, this is called a string union type.
    // Status can only be: 'available' or 'unavailable'.
    status: 'available' | 'unavailable';
    dentist_id: string;
  };