-- =====================================
-- Doctor Notes Table
-- =====================================

CREATE TABLE public.doctor_notes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id uuid NOT NULL
        REFERENCES public.appointments(id)
        ON DELETE CASCADE,
    doctor_name text NOT NULL,
    note_type text NOT NULL,
    content text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================
-- Note Type Validation
-- =====================================

ALTER TABLE public.doctor_notes
ADD CONSTRAINT doctor_notes_type_check
CHECK (
    note_type IN (
        'Diagnosis',
        'Prescription',
        'Recommendation',
        'Follow-up'
    )
);

-- =====================================
-- Content Validation
-- =====================================

ALTER TABLE public.doctor_notes
ADD CONSTRAINT doctor_notes_content_check
CHECK (
    length(trim(content)) > 0
);

-- =====================================
-- Doctor Name Validation
-- =====================================

ALTER TABLE public.doctor_notes
ADD CONSTRAINT doctor_notes_doctor_name_check
CHECK (
    length(trim(doctor_name)) > 0
);

-- =====================================
-- Indexes
-- =====================================

CREATE INDEX idx_doctor_notes_appointment
ON public.doctor_notes(appointment_id);

-- =====================================
-- Update updated_at Automatically
-- =====================================

CREATE TRIGGER trg_doctor_notes_updated_at
BEFORE UPDATE ON public.doctor_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================
-- RLS
-- =====================================

ALTER TABLE public.doctor_notes
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own doctor notes"
ON public.doctor_notes
FOR SELECT
USING (
    EXISTS (
        SELECT 1
        FROM public.appointments a
        WHERE a.id = appointment_id
        AND a.user_id = auth.uid()
    )
);