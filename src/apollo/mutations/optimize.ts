import { gql, MutationTuple, useMutation } from '@apollo/client'


const OPTIMIZE_MUTATION = gql`
  mutation Optimize($cellName: String!, $cellDefJsonStr: String!) {
    optimize(cell_name: $cellName, cell_def: $cellDefJsonStr) {
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
  cellName: string
  cellDefJsonStr: string
}

export const useOptimizeMutation = (): MutationTuple<OptimizeData, OptimizeVars> => {
  return useMutation<OptimizeData, OptimizeVars>(OPTIMIZE_MUTATION)
}
