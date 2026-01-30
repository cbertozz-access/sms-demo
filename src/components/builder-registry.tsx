'use client';

import { Builder } from '@builder.io/react';
import JourneyFlowchart from './JourneyFlowchart';
import ListUploader from './ListUploader';

// Register components with Builder.io for visual editing
Builder.registerComponent(JourneyFlowchart, {
  name: 'JourneyFlowchart',
  inputs: [
    {
      name: 'currentStep',
      type: 'string',
      enum: [
        'offhire-request',
        'scheduled-sms',
        'wait-confirmation',
        'wait-return',
        'reminder-sms',
        'vehicle-returned',
        'complete-sms',
        'complete',
      ],
    },
  ],
});

Builder.registerComponent(ListUploader, {
  name: 'ListUploader',
  inputs: [],
});
