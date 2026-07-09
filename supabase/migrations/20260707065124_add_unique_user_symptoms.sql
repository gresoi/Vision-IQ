-- =====================================
-- Make symptoms one record per user
-- =====================================

ALTER TABLE public.symptoms
ADD CONSTRAINT unique_user_symptoms
UNIQUE (user_id);