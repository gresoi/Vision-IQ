-- =====================================
-- Symptoms Table
-- =====================================

CREATE TABLE public.symptoms (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
user_id uuid NOT NULL
REFERENCES public.profiles(id)
ON DELETE CASCADE,
symptoms text[] NOT NULL,
affected_eye text NOT NULL,
notes text,
recorded_at timestamptz DEFAULT now(),
created_at timestamptz DEFAULT now()
);


-- ===============================
-- Affected Eye Validation
-- ===============================

ALTER TABLE public.symptoms
ADD CONSTRAINT symptoms_affected_eye_check
CHECK (
affected_eye IN (
'Left',
'Right',
'Both'
)
);


-- ===============================
-- Symptoms Validation
-- ===============================

ALTER TABLE public.symptoms
ADD CONSTRAINT symptoms_values_check
CHECK (
symptoms <@ ARRAY[
'Dryness',
'Irritation',
'Eye Strain',
'Blurred Vision',
'Light Sensitivity',
'Pain'
]::text[]
);


-- ===============================
-- RLS
-- ===============================

ALTER TABLE public.symptoms
ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own symptoms"
ON public.symptoms
FOR ALL
USING (
auth.uid() = user_id
)
WITH CHECK (
auth.uid() = user_id
);