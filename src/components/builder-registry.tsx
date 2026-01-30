'use client';

import { Builder } from '@builder.io/react';
import ContractDataForm from './ContractDataForm';
import SMSTemplateEditor from './SMSTemplateEditor';
import SMSPreview from './SMSPreview';
import JourneyFlowchart from './JourneyFlowchart';

// Register components with Builder.io for visual editing
Builder.registerComponent(ContractDataForm, {
  name: 'ContractDataForm',
  inputs: [
    {
      name: 'initialData',
      type: 'object',
      defaultValue: {},
      subFields: [
        { name: 'customerName', type: 'string' },
        { name: 'customerPhone', type: 'string' },
        { name: 'contractId', type: 'string' },
        { name: 'vehicleMake', type: 'string' },
        { name: 'vehicleModel', type: 'string' },
        { name: 'pickupDate', type: 'string' },
        { name: 'returnDate', type: 'string' },
        { name: 'pickupLocation', type: 'string' },
      ],
    },
  ],
});

Builder.registerComponent(SMSTemplateEditor, {
  name: 'SMSTemplateEditor',
  inputs: [
    { name: 'value', type: 'string', defaultValue: '' },
    {
      name: 'availableMergeFields',
      type: 'list',
      defaultValue: [
        'customerName',
        'customerPhone',
        'contractId',
        'vehicleMake',
        'vehicleModel',
        'pickupDate',
        'returnDate',
        'pickupLocation',
      ],
      subFields: [{ name: 'field', type: 'string' }],
    },
  ],
});

Builder.registerComponent(SMSPreview, {
  name: 'SMSPreview',
  inputs: [
    { name: 'template', type: 'string', defaultValue: '' },
    { name: 'data', type: 'object', defaultValue: {} },
    { name: 'isSending', type: 'boolean', defaultValue: false },
  ],
});

Builder.registerComponent(JourneyFlowchart, {
  name: 'JourneyFlowchart',
  inputs: [
    {
      name: 'currentStep',
      type: 'string',
      enum: [
        'booking',
        'confirmation',
        'wait-pickup',
        'reminder',
        'wait-return',
        'return-reminder',
        'complete',
      ],
    },
  ],
});
