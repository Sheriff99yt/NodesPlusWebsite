/**
 * Nodes Plus Node Data
 * 
 * This file contains the structured data for all Nodes Plus Blueprint nodes.
 * The data is structured based on the information from NodesPlusLibraryDevelopment.md
 */

// Node data types and structures for Nodes Plus documentation

// Pin represents an input or output on a node
export interface Pin {
  name: string;
  type: string;
  description: string;
  isExec?: boolean;
  defaultValue?: string;
}

// Example of a node usage
export interface NodeExample {
  title: string;
  description: string;
  code?: string;
  image?: string;
}

// Represents a Nodes Plus node
export interface Node {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  complexity: 'simple' | 'moderate' | 'complex';
  inputs?: Pin[];
  outputs?: Pin[];
  examples?: NodeExample[];
  errorHandling?: string;
  performanceNotes?: string;
  searchKeywords: string[];
}

// Category for grouping nodes
export interface NodeCategory {
  id: string;
  name: string;
  description: string;
}

// Define node categories
export const nodeCategories: NodeCategory[] = [
  {
    id: 'debug',
    name: 'Debug & Utilities',
    description: 'Nodes for debugging and basic utility operations'
  },
  {
    id: 'math',
    name: 'Math & Calculations',
    description: 'Mathematical operations and calculations'
  },
  {
    id: 'string',
    name: 'String Operations',
    description: 'Text and string manipulation nodes'
  },
  {
    id: 'utility',
    name: 'Utility',
    description: 'General purpose utility nodes'
  },
  {
    id: 'array',
    name: 'Array & Collection Operations',
    description: 'Operations for working with arrays and collections'
  }
];

// Define the nodes
export const nodes: Node[] = [
  // Debug & Utilities Nodes
  {
    id: 'hello-world',
    name: 'Hello World',
    category: 'debug',
    shortDescription: 'Prints "Hello, World!" to the output log',
    longDescription: 'A simple test node that prints "Hello, World!" to the output log. Used to validate plugin architecture.',
    complexity: 'simple',
    inputs: [
      {
        name: 'Execute',
        type: 'Exec',
        description: 'Triggers the node execution',
        isExec: true
      }
    ],
    outputs: [
      {
        name: 'Then',
        type: 'Exec',
        description: 'Executed after the message is printed',
        isExec: true
      }
    ],
    errorHandling: 'Always succeeds, no validation required.',
    searchKeywords: ['debug', 'print', 'log', 'hello', 'test']
  },

  // Math & Calculations Nodes
  {
    id: 'is-nearly-equal',
    name: 'Is Nearly Equal (Float)',
    category: 'math',
    shortDescription: 'Checks if two floats are nearly equal within tolerance',
    longDescription: 'Compares two float values with a tolerance to account for floating point precision errors. Addresses common issues when comparing floating-point numbers for equality.',
    complexity: 'simple',
    inputs: [
      {
        name: 'A',
        type: 'Float',
        description: 'First value to compare'
      },
      {
        name: 'B',
        type: 'Float',
        description: 'Second value to compare'
      },
      {
        name: 'ErrorTolerance',
        type: 'Float',
        description: 'Maximum allowed difference for considering the values as equal',
        defaultValue: '0.0000001'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Boolean',
        description: 'True if the difference between A and B is less than or equal to ErrorTolerance'
      }
    ],
    examples: [
      {
        title: 'Compare calculated values',
        description: 'Use to compare values that may have minor calculation differences.',
        code: 'Math.Sin(1.0) -> Is Nearly Equal (A)\nMath.Sin(1.0 + 2π) -> Is Nearly Equal (B)\n0.0000001 -> Is Nearly Equal (ErrorTolerance)'
      }
    ],
    errorHandling: 'Handles NaN and Infinity values appropriately.',
    performanceNotes: 'Very efficient operation with minimal overhead.',
    searchKeywords: ['float', 'compare', 'equal', 'tolerance', 'approximate', 'precision']
  },

  {
    id: 'is-nearly-zero',
    name: 'Is Nearly Zero (Float)',
    category: 'math',
    shortDescription: 'Checks if value is approximately zero',
    longDescription: 'Tests if a float value is close enough to zero within a specified tolerance. Useful for checking if calculations result in effectively zero values.',
    complexity: 'simple',
    inputs: [
      {
        name: 'Value',
        type: 'Float',
        description: 'Value to check if close to zero'
      },
      {
        name: 'ErrorTolerance',
        type: 'Float',
        description: 'Maximum absolute value to consider as "nearly zero"',
        defaultValue: '0.0000001'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Boolean',
        description: 'True if the absolute value is less than or equal to ErrorTolerance'
      }
    ],
    examples: [
      {
        title: 'Checking for small residuals',
        description: 'When an iterative calculation should reach zero but might have small residual values.',
        code: 'Calculate Residual -> Is Nearly Zero -> Branch'
      }
    ],
    searchKeywords: ['zero', 'float', 'epsilon', 'tolerance', 'math', 'calculation']
  },

  {
    id: 'degrees-to-radians',
    name: 'Degrees To Radians',
    category: 'math',
    shortDescription: 'Convert angle from degrees to radians',
    longDescription: 'Converts an angle value from degrees to radians. Useful for mathematical functions that require radian input.',
    complexity: 'simple',
    inputs: [
      {
        name: 'Degrees',
        type: 'Float',
        description: 'The angle in degrees'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Float',
        description: 'The angle in radians'
      }
    ],
    examples: [
      {
        title: 'Convert user input to radians',
        description: 'Use this node when user inputs angles in degrees but calculations require radians.',
        code: '90.0 -> Degrees To Radians -> Sin\n// Result will be 1.0 (sin of 90 degrees)'
      }
    ],
    searchKeywords: ['conversion', 'angle', 'degrees', 'radians', 'math', 'trigonometry']
  },

  {
    id: 'radians-to-degrees',
    name: 'Radians To Degrees',
    category: 'math',
    shortDescription: 'Convert angle from radians to degrees',
    longDescription: 'Converts an angle value from radians to degrees. Useful for displaying radian values in a more human-readable format.',
    complexity: 'simple',
    inputs: [
      {
        name: 'Radians',
        type: 'Float',
        description: 'The angle in radians'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Float',
        description: 'The angle in degrees'
      }
    ],
    examples: [
      {
        title: 'Display result in degrees',
        description: 'Convert math calculation results from radians to degrees for display.',
        code: 'Math.Atan2(Y, X) -> Radians To Degrees -> Display Angle'
      }
    ],
    searchKeywords: ['conversion', 'angle', 'radians', 'degrees', 'math', 'trigonometry']
  },

  {
    id: 'random-vector-in-cone-degrees',
    name: 'Random Vector in Cone (Degrees)',
    category: 'math',
    shortDescription: 'Generate random vector within cone',
    longDescription: 'Creates a random direction vector within a cone angle. Useful for spawning particles, creating spread patterns, or simulating inaccuracy.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'Direction',
        type: 'Vector',
        description: 'Base direction of the cone'
      },
      {
        name: 'ConeHalfAngleDegrees',
        type: 'Float',
        description: 'Half-angle of cone in degrees'
      },
      {
        name: 'bIsSquished',
        type: 'Boolean',
        description: 'If true, creates a non-uniform cone with different angles in Y and Z',
        defaultValue: 'false'
      },
      {
        name: 'VerticalConeHalfAngleDegrees',
        type: 'Float',
        description: 'Half-angle of cone in vertical direction (only used if bIsSquished is true)',
        defaultValue: '45.0'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Vector',
        description: 'Random normalized vector within the specified cone'
      }
    ],
    examples: [
      {
        title: 'Bullet spread simulation',
        description: 'Create a random spread for weapon fire.',
        code: 'Get Forward Vector -> Random Vector in Cone (Degrees) -> Spawn Projectile'
      }
    ],
    errorHandling: 'Validates Direction is not a zero vector, and normalizes it if needed.',
    searchKeywords: ['random', 'vector', 'cone', 'direction', 'spread', 'angle', 'degrees']
  },

  {
    id: 'random-vector-in-cone-radians',
    name: 'Random Vector in Cone (Radians)',
    category: 'math',
    shortDescription: 'Generate random vector within cone using radians',
    longDescription: 'Creates a random direction vector within a cone angle using radians. Alternative version of the Random Vector in Cone node that uses radians instead of degrees.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'Direction',
        type: 'Vector',
        description: 'Base direction of the cone'
      },
      {
        name: 'ConeHalfAngleRadians',
        type: 'Float',
        description: 'Half-angle of cone in radians'
      },
      {
        name: 'bIsSquished',
        type: 'Boolean',
        description: 'If true, creates a non-uniform cone with different angles in Y and Z',
        defaultValue: 'false'
      },
      {
        name: 'VerticalConeHalfAngleRadians',
        type: 'Float',
        description: 'Half-angle of cone in vertical direction (only used if bIsSquished is true)',
        defaultValue: '0.7853982'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Vector',
        description: 'Random normalized vector within the specified cone'
      }
    ],
    examples: [
      {
        title: 'Bullet spread simulation',
        description: 'Create a random spread for weapon fire using radians.',
        code: 'Get Forward Vector -> Random Vector in Cone (Radians) -> Spawn Projectile'
      }
    ],
    errorHandling: 'Validates Direction is not a zero vector, and normalizes it if needed.',
    searchKeywords: ['random', 'vector', 'cone', 'direction', 'spread', 'angle', 'radians']
  },

  {
    id: 'round-to-nearest-increment',
    name: 'Round To Nearest (Increment)',
    category: 'math',
    shortDescription: 'Rounds a number to the nearest multiple of a specified increment',
    longDescription: 'Rounds a floating-point value to the nearest multiple of a specified increment. Useful for snapping values to grids or intervals in level design, UI positioning, or quantized values.',
    complexity: 'simple',
    inputs: [
      {
        name: 'Value',
        type: 'Float',
        description: 'The value to round'
      },
      {
        name: 'Increment',
        type: 'Float',
        description: 'The increment to round to',
        defaultValue: '1.0'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Float',
        description: 'The rounded value'
      }
    ],
    examples: [
      {
        title: 'Snap to grid',
        description: 'Round a world position to the nearest 5 units.',
        code: 'Get Actor Location -> Round To Nearest (Increment=5.0) -> Set Actor Location'
      },
      {
        title: 'Price rounding',
        description: 'Round a calculated price to nearest $0.25.',
        code: '12.73 -> Round To Nearest (Increment=0.25) -> Display Price\n// Result will be 12.75'
      }
    ],
    errorHandling: 'Validates that Increment is not zero. Returns the input value if Increment is invalid.',
    searchKeywords: ['round', 'increment', 'snap', 'grid', 'quantize', 'multiple']
  },

  {
    id: 'round-away-from-zero',
    name: 'Round Away From Zero',
    category: 'math',
    shortDescription: 'Rounds away from zero instead of to nearest even',
    longDescription: 'Rounds a floating-point value away from zero. This differs from standard rounding which typically rounds to the nearest even number for halfway cases. This node always rounds outward from zero for consistent behavior.',
    complexity: 'simple',
    inputs: [
      {
        name: 'Value',
        type: 'Float',
        description: 'The value to round'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Float',
        description: 'The rounded value'
      }
    ],
    examples: [
      {
        title: 'Consistent rounding',
        description: 'Round values away from zero consistently.',
        code: '-1.5 -> Round Away From Zero -> Print String\n// Result will be -2\n1.5 -> Round Away From Zero -> Print String\n// Result will be 2'
      }
    ],
    searchKeywords: ['round', 'away', 'zero', 'consistent', 'ceiling', 'floor']
  },

  {
    id: 'is-prime-number',
    name: 'Is Prime Number',
    category: 'math',
    shortDescription: 'Checks if an integer is a prime number',
    longDescription: 'Determines if a given integer is a prime number (divisible only by 1 and itself). Useful for procedural generation algorithms, cryptography, or puzzle gameplay mechanics.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'Value',
        type: 'Integer',
        description: 'The integer to check'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Boolean',
        description: 'True if the number is prime'
      }
    ],
    examples: [
      {
        title: 'Procedural generation',
        description: 'Use prime checking to create unique patterns.',
        code: 'Get Current Cell Index -> Is Prime Number -> Branch\n// Different behavior for prime-indexed cells'
      }
    ],
    errorHandling: 'Numbers less than 2 are never prime. Negative numbers are converted to their absolute value.',
    performanceNotes: 'Uses optimized algorithm for checking primality, but can be slow for very large numbers.',
    searchKeywords: ['prime', 'number', 'integer', 'divisible', 'math', 'check']
  },

  {
    id: 'greatest-common-divisor',
    name: 'Greatest Common Divisor',
    category: 'math',
    shortDescription: 'Calculates the GCD of an array of integers',
    longDescription: 'Finds the largest positive integer that divides all the input integers without a remainder. Useful for simplifying fractions, finding common factors, and various mathematical algorithms.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'Values',
        type: 'Array of Integers',
        description: 'Array of integers to find the GCD of'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Integer',
        description: 'The GCD of all values in the array, or 0 if the array is empty'
      }
    ],
    examples: [
      {
        title: 'Simplify fractions',
        description: 'Find the simplest form of a fraction.',
        code: 'GCD of [Numerator, Denominator] -> Divide Both Values'
      }
    ],
    errorHandling: 'Returns 0 if the array is empty. Uses absolute values for calculation (ignores signs).',
    searchKeywords: ['gcd', 'greatest', 'common', 'divisor', 'math', 'factor']
  },

  {
    id: 'least-common-multiple',
    name: 'Least Common Multiple',
    category: 'math',
    shortDescription: 'Calculates the LCM of an array of integers',
    longDescription: 'Finds the smallest positive integer that is divisible by all the input integers. Useful for finding common periods, synchronizing repeating events, and various mathematical applications.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'Values',
        type: 'Array of Integers',
        description: 'Array of integers to find the LCM of'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Integer',
        description: 'The LCM of all values in the array, or 0 if the array is empty or contains 0'
      }
    ],
    examples: [
      {
        title: 'Find cycle repetition',
        description: 'Calculate when two repeating events will coincide.',
        code: 'LCM of [Cycle1Duration, Cycle2Duration] -> Next Synchronization Time'
      }
    ],
    errorHandling: 'Returns 0 if the array is empty. Uses absolute values for calculation (ignores signs).',
    performanceNotes: 'Uses the GCD to efficiently calculate LCM and avoids integer overflow where possible.',
    searchKeywords: ['lcm', 'least', 'common', 'multiple', 'math', 'cycle']
  },

  {
    id: 'angle-between-vectors-signed',
    name: 'Angle Between Vectors (Signed)',
    category: 'math',
    shortDescription: 'Calculates the signed angle between two vectors in a 2D plane',
    longDescription: 'Computes the signed angle between two vectors, providing information about whether the rotation is clockwise or counter-clockwise. This differs from the standard angle calculation which only returns the unsigned (absolute) angle.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'From',
        type: 'Vector',
        description: 'Starting vector'
      },
      {
        name: 'To',
        type: 'Vector',
        description: 'Target vector'
      },
      {
        name: 'AxisZ',
        type: 'Vector',
        description: 'Optional Z axis for the 2D plane',
        defaultValue: '(0,0,1)'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Float',
        description: 'Signed angle in degrees between the vectors (-180 to 180)'
      }
    ],
    examples: [
      {
        title: 'Character steering',
        description: 'Determine whether to turn left or right to face a target.',
        code: 'Get Forward Vector -> Angle Between Vectors (Signed) (From)\nGet Direction to Target -> Angle Between Vectors (Signed) (To)\n// Negative angle means turn left, positive means turn right'
      }
    ],
    errorHandling: 'Returns 0 if either vector is too small (close to zero). Normalizes input vectors automatically.',
    searchKeywords: ['angle', 'vector', 'signed', 'direction', 'rotation', 'clockwise']
  },

  {
    id: 'array-average-float',
    name: 'Average (Float Array)',
    category: 'math',
    shortDescription: 'Calculates the average (arithmetic mean) of an array of float values',
    longDescription: 'Computes the arithmetic mean of an array of float values. Useful for statistical operations and data analysis.',
    complexity: 'simple',
    inputs: [
      {
        name: 'Values',
        type: 'Array of Floats',
        description: 'Array of float values'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Float',
        description: 'The arithmetic mean of the values'
      }
    ],
    examples: [
      {
        title: 'Smoothed sensor reading',
        description: 'Average multiple sensor readings to reduce noise.',
        code: 'Recent Temperature Readings -> Average (Float Array) -> Display Temperature'
      }
    ],
    errorHandling: 'Returns 0 if the array is empty. Ignores non-numeric values in mixed arrays.',
    searchKeywords: ['average', 'mean', 'arithmetic', 'statistics', 'array', 'float']
  },

  {
    id: 'array-average-vector',
    name: 'Average (Vector Array)',
    category: 'math',
    shortDescription: 'Calculates the average (arithmetic mean) of an array of vectors',
    longDescription: 'Computes the arithmetic mean vector of an array of vectors. Calculates a single vector with the average of each component.',
    complexity: 'simple',
    inputs: [
      {
        name: 'Vectors',
        type: 'Array of Vectors',
        description: 'Array of vectors'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Vector',
        description: 'The arithmetic mean vector'
      }
    ],
    examples: [
      {
        title: 'Calculate center position',
        description: 'Find the center point of multiple actors.',
        code: 'Get Multiple Actor Locations -> Average (Vector Array) -> Spawn Effect at Center'
      }
    ],
    errorHandling: 'Returns Zero Vector if the array is empty.',
    searchKeywords: ['average', 'mean', 'arithmetic', 'statistics', 'array', 'vector', 'center']
  },

  {
    id: 'standard-deviation',
    name: 'Standard Deviation',
    category: 'math',
    shortDescription: 'Calculates the standard deviation of a float array',
    longDescription: 'Computes the standard deviation of a set of numeric values, measuring the amount of variation or dispersion from the average. Useful for statistical analysis, data clustering, and measuring data spread.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'Values',
        type: 'Array of Floats',
        description: 'Array of float values'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Float',
        description: 'The standard deviation of the values'
      }
    ],
    examples: [
      {
        title: 'Detect data outliers',
        description: 'Identify values that are outside the normal range.',
        code: 'Data Points -> Standard Deviation -> Calculate Threshold\nData Points -> For Each -> Branch (Value > Threshold)'
      }
    ],
    errorHandling: 'Returns 0 if the array has fewer than 2 elements. Ignores non-numeric values.',
    performanceNotes: 'Requires two passes through the data (one for mean, one for squared differences).',
    searchKeywords: ['standard', 'deviation', 'statistics', 'variance', 'spread', 'distribution']
  },

  {
    id: 'variance',
    name: 'Variance',
    category: 'math',
    shortDescription: 'Calculates the variance of a float array',
    longDescription: 'Computes the variance of a set of numeric values, measuring how far the values are spread out from their average. The variance is the square of the standard deviation, useful for statistical analysis.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'Values',
        type: 'Array of Floats',
        description: 'Array of float values'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Float',
        description: 'The variance of the values'
      }
    ],
    examples: [
      {
        title: 'Compare data sets',
        description: 'Compare the variability of different distributions.',
        code: 'Dataset A -> Variance -> Compare (A)\nDataset B -> Variance -> Compare (B)'
      }
    ],
    errorHandling: 'Returns 0 if the array has fewer than 2 elements. Ignores non-numeric values.',
    performanceNotes: 'Requires two passes through the data (one for mean, one for squared differences).',
    searchKeywords: ['variance', 'statistics', 'spread', 'distribution', 'squared', 'deviation']
  },

  {
    id: 'logarithm-base-n',
    name: 'Logarithm (Base N)',
    category: 'math',
    shortDescription: 'Logarithm to an arbitrary base',
    longDescription: 'Calculates the logarithm of a value using any specified base. This extends beyond the standard natural logarithm (base e) and base-10 logarithm functions built into the engine.',
    complexity: 'simple',
    inputs: [
      {
        name: 'Value',
        type: 'Float',
        description: 'The value to calculate the logarithm of (must be positive)'
      },
      {
        name: 'Base',
        type: 'Float',
        description: 'The logarithm base (must be positive and not 1)',
        defaultValue: '10.0'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Float',
        description: 'The logarithm of Value with the specified Base'
      }
    ],
    examples: [
      {
        title: 'Custom logarithmic scaling',
        description: 'Scale values using a custom logarithmic function.',
        code: 'Raw Value -> Logarithm (Base N) (Base=2) -> Scale Result'
      }
    ],
    errorHandling: 'Validates Value is positive and Base is valid (positive and not 1). Returns 0 for invalid inputs.',
    searchKeywords: ['logarithm', 'log', 'base', 'math', 'exponent', 'scale']
  },

  {
    id: 'clamp-angle-radians',
    name: 'Clamp Angle (Radians)',
    category: 'math',
    shortDescription: 'Clamps an angle to a specific range',
    longDescription: 'Normalizes an angle in radians to a specified range, such as 0 to 2π or -π to π. Useful for angle calculations, rotations, and ensuring consistent angle formats.',
    complexity: 'simple',
    inputs: [
      {
        name: 'Angle',
        type: 'Float',
        description: 'The angle in radians to clamp'
      },
      {
        name: 'MinAngle',
        type: 'Float',
        description: 'Minimum angle of the range',
        defaultValue: '0.0'
      },
      {
        name: 'MaxAngle',
        type: 'Float',
        description: 'Maximum angle of the range',
        defaultValue: '6.28318' // 2π
      }
    ],
    outputs: [
      {
        name: 'ClampedAngle',
        type: 'Float',
        description: 'The angle clamped to the specified range'
      }
    ],
    examples: [
      {
        title: 'Normalize rotation',
        description: 'Ensure a rotation angle stays within the -π to π range.',
        code: 'Current Rotation Radians -> Clamp Angle (Radians) (Min=-3.14159, Max=3.14159) -> Set Rotation'
      }
    ],
    errorHandling: 'Validates that MinAngle is less than MaxAngle and that the range is not more than a full circle (2π).',
    searchKeywords: ['angle', 'clamp', 'normalize', 'radians', 'rotation', 'range']
  },

  // String Operations Nodes
  {
    id: 'to-title-case',
    name: 'To Title Case',
    category: 'string',
    shortDescription: 'Converts a string to title case',
    longDescription: 'Transforms a string to title case format where the first letter of each word is capitalized. Useful for formatting titles, names, and other text that requires title capitalization.',
    complexity: 'simple',
    inputs: [
      {
        name: 'InString',
        type: 'String',
        description: 'The string to convert'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'String',
        description: 'The title-cased string'
      }
    ],
    examples: [
      {
        title: 'Format heading text',
        description: 'Convert a string to proper title case for UI elements.',
        code: '"the quick brown fox" -> To Title Case -> Set Text\n// Result will be "The Quick Brown Fox"'
      }
    ],
    searchKeywords: ['title', 'case', 'string', 'capitalize', 'format', 'text']
  },

  {
    id: 'to-sentence-case',
    name: 'To Sentence Case',
    category: 'string',
    shortDescription: 'Converts a string to sentence case',
    longDescription: 'Transforms a string to sentence case format where the first letter of each sentence is capitalized. Useful for formatting body text, paragraphs, and other prose-style content.',
    complexity: 'simple',
    inputs: [
      {
        name: 'InString',
        type: 'String',
        description: 'The string to convert'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'String',
        description: 'The sentence-cased string'
      }
    ],
    examples: [
      {
        title: 'Format paragraph text',
        description: 'Convert text to proper sentence case for dialog or descriptions.',
        code: '"hello world. this is a test." -> To Sentence Case -> Set Description\n// Result will be "Hello world. This is a test."'
      }
    ],
    searchKeywords: ['sentence', 'case', 'string', 'capitalize', 'format', 'text']
  },

  {
    id: 'invert-case',
    name: 'Invert Case',
    category: 'string',
    shortDescription: 'Inverts the case of each letter in a string',
    longDescription: 'Reverses the case of each letter in a string, making uppercase letters lowercase and lowercase letters uppercase. Useful for text effects, stylization, and certain text processing operations.',
    complexity: 'simple',
    inputs: [
      {
        name: 'InString',
        type: 'String',
        description: 'The string to invert the case of'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'String',
        description: 'The case-inverted string'
      }
    ],
    examples: [
      {
        title: 'Create visual effect',
        description: 'Create alternating case for visual emphasis.',
        code: '"Hello World" -> Invert Case -> Set Text\n// Result will be "hELLO wORLD"'
      }
    ],
    searchKeywords: ['invert', 'case', 'string', 'flip', 'uppercase', 'lowercase']
  },

  {
    id: 'string-similarity',
    name: 'String Similarity',
    category: 'string',
    shortDescription: 'Returns a percentage representing the similarity between two strings',
    longDescription: 'Calculates how similar two strings are and returns a percentage score. Uses the Levenshtein distance metric to determine the number of edits needed to transform one string into another. Useful for fuzzy matching, typo correction, and finding similar text.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'StringA',
        type: 'String',
        description: 'First string to compare'
      },
      {
        name: 'StringB',
        type: 'String',
        description: 'Second string to compare'
      },
      {
        name: 'bCaseSensitive',
        type: 'Boolean',
        description: 'Whether the comparison should be case-sensitive',
        defaultValue: 'false'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Float',
        description: 'Similarity percentage (0-100)'
      }
    ],
    examples: [
      {
        title: 'Check for typos',
        description: 'Verify if user input matches expected value with tolerance for typos.',
        code: 'User Input -> String Similarity -> Branch (Similarity > 80)\n// Accept input if it\'s at least 80% similar'
      }
    ],
    performanceNotes: 'For very long strings, this calculation can be expensive.',
    searchKeywords: ['similarity', 'compare', 'string', 'percentage', 'levenshtein', 'fuzzy']
  },

  {
    id: 'count-occurrences',
    name: 'Count Occurrences',
    category: 'string',
    shortDescription: 'Counts the number of times a substring appears within a larger string',
    longDescription: 'Counts how many times a specific substring appears within a source string. Useful for text analysis, finding word frequency, or detecting patterns in text data.',
    complexity: 'simple',
    inputs: [
      {
        name: 'SourceString',
        type: 'String',
        description: 'The string to search within'
      },
      {
        name: 'Substring',
        type: 'String',
        description: 'The substring to search for'
      },
      {
        name: 'bCaseSensitive',
        type: 'Boolean',
        description: 'Whether the search should be case-sensitive',
        defaultValue: 'false'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Integer',
        description: 'The number of occurrences'
      }
    ],
    examples: [
      {
        title: 'Word frequency analysis',
        description: 'Count how many times a specific word appears in a text.',
        code: 'Long Text -> Count Occurrences (Substring=\'the\') -> Display Count'
      }
    ],
    errorHandling: 'Returns 0 if either string is empty or if the substring is not found.',
    searchKeywords: ['count', 'substring', 'occurrences', 'find', 'frequency', 'text']
  },

  {
    id: 'string-fuzzy-search',
    name: 'Fuzzy String Search',
    category: 'string',
    shortDescription: 'Performs fuzzy matching between strings',
    longDescription: 'Searches for close matches to a term within a collection of candidate strings. Ranks results by similarity, allowing for typos and minor variations. Useful for search interfaces, auto-completion, and handling user input with errors.',
    complexity: 'complex',
    inputs: [
      {
        name: 'SearchTerm',
        type: 'String',
        description: 'The term to search for'
      },
      {
        name: 'Candidates',
        type: 'Array of Strings',
        description: 'Array of strings to search within'
      },
      {
        name: 'MinimumScore',
        type: 'Float',
        description: 'Minimum similarity score (0-100) for a result to be included',
        defaultValue: '50'
      },
      {
        name: 'MaxResults',
        type: 'Integer',
        description: 'Maximum number of results to return (0 for all matches)',
        defaultValue: '10'
      },
      {
        name: 'bCaseSensitive',
        type: 'Boolean',
        description: 'Whether the search should be case-sensitive',
        defaultValue: 'false'
      },
      {
        name: 'bExactMatchOnly',
        type: 'Boolean',
        description: 'If true, only returns exact matches (ignores MinimumScore)',
        defaultValue: 'false'
      }
    ],
    outputs: [
      {
        name: 'ResultStrings',
        type: 'Array of Strings',
        description: 'Array of matching strings, sorted by similarity (best matches first)'
      },
      {
        name: 'ResultIndices',
        type: 'Array of Integers',
        description: 'Indices of matching strings in the original Candidates array'
      }
    ],
    examples: [
      {
        title: 'Auto-complete implementation',
        description: 'Suggest possible completions as the user types.',
        code: 'User Input -> Fuzzy String Search -> Display Suggestions'
      }
    ],
    performanceNotes: 'Can be computationally expensive with large candidate arrays. Consider filtering candidates first for better performance.',
    searchKeywords: ['fuzzy', 'search', 'match', 'similar', 'typo', 'autocomplete']
  },

  // Utility Nodes
  {
    id: 'timer-loop',
    name: 'Timer Loop',
    category: 'utility',
    shortDescription: 'Creates a timed loop with configurable delay',
    longDescription: 'Creates a timer that executes at specified intervals. The node provides full flow control with separate pins for setup, looping, breaking, and completion. Enhances the standard Delay node with optional looping functionality.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'Exec',
        type: 'Exec',
        description: 'Execution input pin',
        isExec: true
      },
      {
        name: 'Duration',
        type: 'Float',
        description: 'Time in seconds between iterations',
        defaultValue: '1.0'
      },
      {
        name: 'Loop',
        type: 'Boolean',
        description: 'Whether to continue looping after the first iteration',
        defaultValue: 'true'
      },
      {
        name: 'Break',
        type: 'Boolean', 
        description: 'Signal to break out of the loop',
        defaultValue: 'false'
      }
    ],
    outputs: [
      {
        name: 'Before',
        type: 'Exec',
        description: 'Fires once at the beginning without delay',
        isExec: true
      },
      {
        name: 'Loop Body',
        type: 'Exec',
        description: 'Fires as long as the loop condition is true, after each delay duration',
        isExec: true
      },
      {
        name: 'On Break',
        type: 'Exec',
        description: 'Fires once when the Break input is used',
        isExec: true
      },
      {
        name: 'Continue',
        type: 'Exec',
        description: 'Fires once when loop condition becomes false',
        isExec: true
      },
      {
        name: 'Index',
        type: 'Integer',
        description: 'Current iteration index (0-based)'
      }
    ],
    examples: [
      {
        title: 'Countdown sequence',
        description: 'Create a countdown timer for a game start sequence.',
        code: 'Start Countdown -> Timer Loop -> Display Count -> Play Start Sound'
      }
    ],
    errorHandling: 'Validates that Duration is non-negative and Iterations is at least 1, with warnings for extreme values.',
    performanceNotes: 'Timer operations use the global timer manager and are efficient for reasonable numbers of timers. For high-frequency operations (duration < 0.1), consider using a tick event instead.',
    searchKeywords: ['timer', 'count', 'delay', 'iteration', 'countdown', 'wait', 'loop']
  },

  {
    id: 'timer-n',
    name: 'Timer N',
    category: 'utility',
    shortDescription: 'Creates a timed loop with a fixed number of iterations',
    longDescription: 'Creates a timer that executes at specified intervals for a fixed number of iterations. Similar to Timer Loop, but with a predefined number of iterations. Useful for countdown timers, step sequences, and other operations that need to execute a specific number of times.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'Exec',
        type: 'Exec',
        description: 'Execution input pin',
        isExec: true
      },
      {
        name: 'Duration',
        type: 'Float',
        description: 'Time in seconds between iterations',
        defaultValue: '1.0'
      },
      {
        name: 'Iterations',
        type: 'Integer',
        description: 'Number of iterations to perform',
        defaultValue: '5'
      },
      {
        name: 'Break',
        type: 'Exec',
        description: 'Signal to break out of the loop',
        defaultValue: 'false',
        isExec: true
      }
    ],
    outputs: [
      {
        name: 'Before',
        type: 'Exec',
        description: 'Fires once at the beginning without delay',
        isExec: true
      },
      {
        name: 'Loop Body',
        type: 'Exec',
        description: 'Fires after each delay duration, up to Iterations times',
        isExec: true
      },
      {
        name: 'On Break',
        type: 'Exec',
        description: 'Fires once when the Break input is used',
        isExec: true
      },
      {
        name: 'Complete',
        type: 'Exec',
        description: 'Fires once when all iterations are completed',
        isExec: true
      },
      {
        name: 'Index',
        type: 'Integer',
        description: 'Current iteration index (0-based)'
      }
    ],
    examples: [
      {
        title: 'Countdown sequence',
        description: 'Create a countdown timer for a game start sequence.',
        code: 'Start Countdown -> Timer N (Iterations=3) -> Display Count -> Play Start Sound\n// Will countdown 3, 2, 1 with delay between each'
      }
    ],
    errorHandling: 'Validates that Duration is non-negative and Iterations is at least 1, with warnings for extreme values.',
    performanceNotes: 'Same as Timer Loop - use with caution for very high-frequency or long-running operations.',
    searchKeywords: ['timer', 'count', 'delay', 'iteration', 'countdown', 'wait', 'fixed']
  },

  // Array & Collection Operations Nodes
  {
    id: 'array-unique',
    name: 'Array Unique',
    category: 'array',
    shortDescription: 'Removes duplicate entries from an array',
    longDescription: 'Creates a new array containing only the unique elements from the input array, removing all duplicates. Works with primitive types, objects, and structs based on value equality.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'TargetArray',
        type: 'Array',
        description: 'The array to remove duplicates from'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Array',
        description: 'A new array containing only the unique elements'
      }
    ],
    examples: [
      {
        title: 'Filter collected items',
        description: 'Remove duplicate items from player inventory.',
        code: 'Player Inventory -> Array Unique -> Update Inventory'
      }
    ],
    performanceNotes: 'Performance scales with the array size. For very large arrays, this operation may be expensive.',
    searchKeywords: ['array', 'unique', 'duplicate', 'remove', 'filter', 'distinct']
  },

  {
    id: 'array-union',
    name: 'Array Union',
    category: 'array',
    shortDescription: 'Returns a new array containing all unique elements from two input arrays',
    longDescription: 'Combines two arrays and removes any duplicates, returning a new array with all unique elements from both input arrays. Useful for merging collections while ensuring no duplicates exist.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'ArrayA',
        type: 'Array',
        description: 'First input array'
      },
      {
        name: 'ArrayB',
        type: 'Array',
        description: 'Second input array'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Array',
        description: 'A new array containing all unique elements from both arrays'
      }
    ],
    examples: [
      {
        title: 'Merge item collections',
        description: 'Combine two inventories without duplicates.',
        code: 'Player Inventory -> Array Union (A)\nChest Contents -> Array Union (B) -> Combined Unique Items'
      }
    ],
    performanceNotes: 'For large arrays, this operation may be expensive as it needs to check for duplicates.',
    searchKeywords: ['array', 'union', 'combine', 'merge', 'unique', 'set']
  },

  {
    id: 'array-intersection',
    name: 'Array Intersection',
    category: 'array',
    shortDescription: 'Returns a new array containing only elements present in both input arrays',
    longDescription: 'Creates a new array containing only the elements that exist in both input arrays. Useful for finding common items between collections or implementing set-based operations.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'ArrayA',
        type: 'Array',
        description: 'First input array'
      },
      {
        name: 'ArrayB',
        type: 'Array',
        description: 'Second input array'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Array',
        description: 'A new array containing only elements present in both arrays'
      }
    ],
    examples: [
      {
        title: 'Find common requirements',
        description: 'Determine which crafting materials are needed for two different recipes.',
        code: 'Recipe1 Requirements -> Array Intersection (A)\nRecipe2 Requirements -> Array Intersection (B) -> Common Materials'
      }
    ],
    performanceNotes: 'Performance depends on the size of both arrays. Optimized to use the smaller array for lookups.',
    searchKeywords: ['array', 'intersection', 'common', 'both', 'filter', 'set']
  },

  {
    id: 'array-difference',
    name: 'Array Difference (A - B)',
    category: 'array',
    shortDescription: 'Returns a new array containing elements in array A but not in array B',
    longDescription: 'Creates a new array with elements that are present in the first array but not in the second array. Useful for finding the unique elements in one collection compared to another.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'ArrayA',
        type: 'Array',
        description: 'Source array'
      },
      {
        name: 'ArrayB',
        type: 'Array',
        description: 'Array to subtract'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Array',
        description: 'A new array containing elements in A but not in B'
      }
    ],
    examples: [
      {
        title: 'Find missing items',
        description: 'Determine which items from a required list are still missing.',
        code: 'Required Items -> Array Difference (A)\nCollected Items -> Array Difference (B) -> Missing Items'
      }
    ],
    performanceNotes: 'Performance depends on the size of both arrays.',
    searchKeywords: ['array', 'difference', 'subtract', 'exclude', 'filter', 'set']
  },

  {
    id: 'array-symmetric-difference',
    name: 'Array Symmetric Difference',
    category: 'array',
    shortDescription: 'Returns elements that are in either array A or B, but not both',
    longDescription: 'Creates a new array containing elements that are unique to each input array, excluding common elements. This is equivalent to the union of A-B and B-A. Useful for finding the unique differences between two collections.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'ArrayA',
        type: 'Array',
        description: 'First input array'
      },
      {
        name: 'ArrayB',
        type: 'Array',
        description: 'Second input array'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Array',
        description: 'A new array containing elements in either A or B, but not both'
      }
    ],
    examples: [
      {
        title: 'Find inventory changes',
        description: 'Determine what items changed between two inventory states.',
        code: 'Previous Inventory -> Array Symmetric Difference (A)\nCurrent Inventory -> Array Symmetric Difference (B) -> Changed Items'
      }
    ],
    performanceNotes: 'More computationally expensive than basic difference or intersection operations.',
    searchKeywords: ['array', 'symmetric', 'difference', 'exclusive', 'unique', 'xor']
  },

  // Planned Nodes (Community Requested)
  {
    id: 'shuffle-array',
    name: 'Shuffle Array (Seedable)',
    category: 'array',
    shortDescription: 'Shuffles the elements of an array randomly',
    longDescription: 'Randomizes the order of elements in an array with an optional seed for reproducibility. The seed allows you to generate the same shuffle pattern multiple times, which is useful for deterministic randomization in games.',
    complexity: 'simple',
    inputs: [
      {
        name: 'TargetArray',
        type: 'Array',
        description: 'The array to shuffle'
      },
      {
        name: 'UseRandomSeed',
        type: 'Boolean',
        description: 'Whether to use the provided seed',
        defaultValue: 'false'
      },
      {
        name: 'Seed',
        type: 'Integer',
        description: 'Random seed value for reproducible shuffling',
        defaultValue: '0'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Array',
        description: 'A new shuffled array'
      }
    ],
    examples: [
      {
        title: 'Card deck shuffling',
        description: 'Shuffle a deck of cards with reproducible results.',
        code: 'Card Deck -> Shuffle Array (UseRandomSeed=true, Seed=GameSeed) -> Shuffled Deck'
      }
    ],
    performanceNotes: 'Uses an efficient Fisher-Yates shuffle algorithm with O(n) complexity.',
    searchKeywords: ['array', 'shuffle', 'random', 'seed', 'order', 'randomize']
  },

  {
    id: 'array-insert-multiple',
    name: 'Array Insert Multiple at Index',
    category: 'array',
    shortDescription: 'Inserts multiple elements into an array at a specific index',
    longDescription: 'Adds multiple elements into an array at a specified position. This is more efficient than inserting elements one at a time, especially for large arrays or when inserting many elements.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'TargetArray',
        type: 'Array',
        description: 'The array to modify'
      },
      {
        name: 'NewItems',
        type: 'Array',
        description: 'Array of elements to insert'
      },
      {
        name: 'Index',
        type: 'Integer',
        description: 'Index at which to insert the new elements',
        defaultValue: '0'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Array',
        description: 'The modified array with inserted elements'
      }
    ],
    examples: [
      {
        title: 'Insert quest chain',
        description: 'Add a sequence of quests at a specific point in the player\'s quest log.',
        code: 'Player Quests -> Array Insert Multiple (NewItems=NewQuestChain, Index=3) -> Update Quest Log'
      }
    ],
    errorHandling: 'Validates that Index is within bounds of the array. If Index equals the array length, items are appended.',
    searchKeywords: ['array', 'insert', 'multiple', 'add', 'batch', 'index']
  },

  {
    id: 'array-remove-range',
    name: 'Array Remove Range',
    category: 'array',
    shortDescription: 'Removes a range of elements from an array based on start and end indices',
    longDescription: 'Removes a specified number of consecutive elements from an array starting at a given index. More efficient than removing elements one by one, especially for large arrays.',
    complexity: 'moderate',
    inputs: [
      {
        name: 'TargetArray',
        type: 'Array',
        description: 'The array to modify'
      },
      {
        name: 'StartIndex',
        type: 'Integer',
        description: 'Index of the first element to remove',
        defaultValue: '0'
      },
      {
        name: 'Count',
        type: 'Integer',
        description: 'Number of elements to remove',
        defaultValue: '1'
      }
    ],
    outputs: [
      {
        name: 'Return Value',
        type: 'Array',
        description: 'The modified array with elements removed'
      }
    ],
    examples: [
      {
        title: 'Remove completed quest section',
        description: 'Remove a group of completed quests from the quest log.',
        code: 'Quest Log -> Array Remove Range (StartIndex=5, Count=3) -> Update Quest Log'
      }
    ],
    errorHandling: 'Validates that StartIndex is within bounds and Count is positive. If the range extends beyond the array, it will be capped at the array bounds.',
    searchKeywords: ['array', 'remove', 'range', 'delete', 'slice', 'batch']
  },

  {
    id: 'dictionary-to-array',
    name: 'Dictionary to Array',
    category: 'array',
    shortDescription: 'Converts a dictionary/map to key and value arrays',
    longDescription: 'Splits a dictionary or map data structure into separate arrays for keys and values. Useful for processing dictionary data with array operations or visualizing dictionary contents.',
    complexity: 'simple',
    inputs: [
      {
        name: 'TargetMap',
        type: 'Map',
        description: 'The map to convert'
      }
    ],
    outputs: [
      {
        name: 'Keys',
        type: 'Array',
        description: 'Array containing all the keys from the map'
      },
      {
        name: 'Values',
        type: 'Array',
        description: 'Array containing all the values from the map'
      }
    ],
    examples: [
      {
        title: 'Display player stats',
        description: 'Extract player statistics from a map for UI display.',
        code: 'Player Stats Map -> Dictionary to Array -> Create UI List from Keys and Values'
      }
    ],
    performanceNotes: 'Linear time complexity, proportional to the size of the dictionary.',
    searchKeywords: ['dictionary', 'map', 'array', 'keys', 'values', 'convert']
  },

  {
    id: 'array-to-dictionary',
    name: 'Array to Dictionary',
    category: 'array',
    shortDescription: 'Converts key and value arrays into a dictionary/map',
    longDescription: 'Creates a dictionary or map data structure from separate arrays of keys and values. The keys and values are paired by index - the first key is paired with the first value, and so on.',
    complexity: 'simple',
    inputs: [
      {
        name: 'Keys',
        type: 'Array',
        description: 'Array containing the keys'
      },
      {
        name: 'Values',
        type: 'Array',
        description: 'Array containing the values'
      },
      {
        name: 'HandleDuplicateKeys',
        type: 'Enum (Skip, Overwrite, Error)',
        description: 'How to handle duplicate keys',
        defaultValue: 'Overwrite'
      }
    ],
    outputs: [
      {
        name: 'Result',
        type: 'Map',
        description: 'A new map with keys and values from the input arrays'
      },
      {
        name: 'Success',
        type: 'Boolean',
        description: 'Whether the operation was successful'
      }
    ],
    examples: [
      {
        title: 'Create configuration map',
        description: 'Convert two arrays of settings into a configuration map.',
        code: 'Setting Names -> Array to Dictionary (Keys)\nSetting Values -> Array to Dictionary (Values) -> Config Map'
      }
    ],
    errorHandling: 'If the arrays have different lengths, only pairs up to the shorter array\'s length are processed. If duplicate keys are found, behavior depends on the HandleDuplicateKeys setting.',
    searchKeywords: ['array', 'dictionary', 'map', 'convert', 'keys', 'values']
  }
];

// Helper function to get all nodes in a specific category
export function getNodesByCategory(categoryId: string): Node[] {
  return nodes.filter(node => node.category === categoryId);
}

// Helper function to get a node by its ID
export function getNodeById(nodeId: string | undefined): Node | undefined {
  if (!nodeId) return undefined;
  return nodes.find(node => node.id === nodeId);
}

// Helper function to search nodes by text
export function searchNodes(searchTerm: string): Node[] {
  if (!searchTerm || searchTerm.trim() === '') {
    return [];
  }
  
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  
  return nodes.filter(node => {
    // Search in node name
    if (node.name.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }
    
    // Search in description
    if (node.shortDescription.toLowerCase().includes(lowercaseSearchTerm)) {
      return true;
    }
    
    // Search in keywords
    if (node.searchKeywords.some(keyword => 
      keyword.toLowerCase().includes(lowercaseSearchTerm)
    )) {
      return true;
    }
    
    return false;
  });
} 