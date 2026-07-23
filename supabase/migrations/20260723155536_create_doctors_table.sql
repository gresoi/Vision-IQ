CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    google_maps_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



CREATE INDEX IF NOT EXISTS idx_doctors_name
ON public.doctors(name);

CREATE INDEX IF NOT EXISTS idx_doctors_specialty
ON public.doctors(specialty);

-- UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_doctors_updated_at
ON public.doctors;

CREATE TRIGGER trg_doctors_updated_at
BEFORE UPDATE
ON public.doctors
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


-- ROW LEVEL SECURITY
ALTER TABLE public.doctors
ENABLE ROW LEVEL SECURITY;



CREATE POLICY "Authenticated users can view doctors"
ON public.doctors
FOR SELECT
TO authenticated
USING (
    true
);