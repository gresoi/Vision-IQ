

-- Drop old foreign key
ALTER TABLE public.exam_records
DROP CONSTRAINT IF EXISTS exam_records_doctor_id_fkey;

-- Add new foreign key
ALTER TABLE public.exam_records
ADD CONSTRAINT exam_records_doctor_id_fkey
FOREIGN KEY (doctor_id)
REFERENCES public.doctors(id)
ON UPDATE CASCADE
ON DELETE RESTRICT;