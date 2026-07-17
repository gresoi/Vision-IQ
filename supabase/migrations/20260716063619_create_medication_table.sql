-- =====================================
-- Medications Table
-- =====================================

CREATE TABLE public.medications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,
    name text NOT NULL,
    dosage text,
    frequency text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================
-- Name Validation
-- =====================================

ALTER TABLE public.medications
ADD CONSTRAINT medications_name_check
CHECK (
    length(trim(name)) > 0
);

-- =====================================
-- Indexes
-- =====================================

CREATE INDEX idx_medications_user_id
ON public.medications(user_id);

-- =====================================
-- Update updated_at Automatically
-- =====================================

CREATE TRIGGER trg_medications_updated_at
BEFORE UPDATE ON public.medications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================
-- RLS
-- =====================================

ALTER TABLE public.medications
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own medications"
ON public.medications
FOR ALL
USING (
    auth.uid() = user_id
)
WITH CHECK (
    auth.uid() = user_id
);