import { gql, MutationTuple, useMutation } from '@apollo/client'


const OPTIMIZE_MUTATION = gql`
  mutation Optimize($cellDefJsonStr: String!) {
    optimize(cell_def: $cellDefJsonStr) {
      status
      result_json
      gantt
    }
  }
`

interface OptimizeData {
  optimize: {
    status: string,
    result_json: string | null,
    gantt: string | null,
  }
}

interface OptimizeVars {
  cellDefJsonStr: string
}

export const useOptimizeMutation = (): MutationTuple<OptimizeData, OptimizeVars> => {
  return useMutation<OptimizeData, OptimizeVars>(OPTIMIZE_MUTATION)
}
