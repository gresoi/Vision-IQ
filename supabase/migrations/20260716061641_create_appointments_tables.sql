-- =====================================
-- Appointments Table
-- =====================================

CREATE TABLE public.appointments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,
    provider_name text NOT NULL,
    appointment_date timestamptz NOT NULL,
    place text,
    notes text,
    doctor_questions jsonb NOT NULL DEFAULT '[]'::jsonb,
    user_notes jsonb NOT NULL DEFAULT '[]'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================
-- Provider Validation
-- =====================================

ALTER TABLE public.appointments
ADD CONSTRAINT appointments_provider_name_check
CHECK (
    length(trim(provider_name)) > 0
);

-- =====================================
-- Appointment Date Validation
-- =====================================

ALTER TABLE public.appointments
ADD CONSTRAINT appointments_date_check
CHECK (
    appointment_date IS NOT NULL
);

-- =====================================
-- Indexes
-- =====================================

CREATE INDEX idx_appointments_user_id
ON public.appointments(user_id);

CREATE INDEX idx_appointments_date
ON public.appointments(appointment_date);

-- =====================================
-- Update updated_at Automatically
-- =====================================

CREATE TRIGGER trg_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================
-- RLS
-- =====================================

ALTER TABLE public.appointments
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own appointments"
ON public.appointments
FOR ALL
USING (
    auth.uid() = user_id
)
WITH CHECK (
    auth.uid() = user_id
);



