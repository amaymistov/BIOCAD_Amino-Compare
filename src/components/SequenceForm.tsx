import {useForm} from 'react-hook-form';
import {Button, TextField, Stack, Alert} from '@mui/material';
import type {AlignmentResult, FormDateRecord} from "../types/types";
import {validateAminoAcidSequence, validateSequenceLength} from "../helpers/validateForm";


export const SequenceForm = ({onSubmit}: { onSubmit: (data: AlignmentResult) => void }) => {
  const {register, handleSubmit, formState: {errors}, watch} = useForm<FormDateRecord>({mode: 'onChange'});

  const [sequence1, sequence2] = watch(['sequence1', 'sequence2'])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          label="Последовательность 1"
          {...register('sequence1', {
            required: 'Обязательное поле',
            validate: {
              validateAminoAcidSequence,
              validLength: (value, formValues) => validateSequenceLength(value, formValues.sequence2)
            }
          })}
          error={!!errors.sequence1}
          value={sequence1 || ''}
          fullWidth
        />

        <TextField
          label="Последовательность 2"
          {...register('sequence2', {
            required: 'Обязательное поле',
            validate: {
              validateAminoAcidSequence,
              validLength: (value, formValues) => validateSequenceLength(value, formValues.sequence1)
            }
          })}
          error={!!errors.sequence2}
          value={sequence2 || ''}
          fullWidth
        />

        {(errors.sequence1 || errors.sequence2) && (
          <Alert severity="error" sx={{mt: 1}}>
            {errors.sequence1?.message || errors.sequence2?.message}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={!!errors.sequence1 || !!errors.sequence2}
        >
          Выровнять
        </Button>
      </Stack>
    </form>
  );
};