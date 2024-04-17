import { gql, MutationTuple, useMutation } from '@apollo/client'


const OPTIMIZE_MUTATION = gql`
  mutation Optimize($cellDefJsonStr: String!) {
    optimize(cell_def: $cellDefJsonStr) {
      status
      output_filename
    }
  }
`

interface OptimizeData {
  optimize: {
    status: string,
    output_filename: string | null,
  }
}

interface OptimizeVars {
  cellDefJsonStr: string
}

export const useOptimizeMutation = (): MutationTuple<OptimizeData, OptimizeVars> => {
  return useMutation<OptimizeData, OptimizeVars>(OPTIMIZE_MUTATION)
}
