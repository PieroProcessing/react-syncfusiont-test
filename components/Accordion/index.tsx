import * as React from 'react';
import {
  AccordionComponent,
  AccordionItemDirective,
  AccordionItemsDirective,
} from '@syncfusion/ej2-react-navigations';

interface AccordionProps {
  header: string;
  children: React.ReactElement;
}
export const Accordion: React.FC<AccordionProps> = ({ children, header }) => {
  const content = React.useCallback(() => children, [children]);
  return (
    <AccordionComponent>
      <AccordionItemsDirective>
        <AccordionItemDirective
          expanded="true"
          header={header}
          content={content}
        />
      </AccordionItemsDirective>
    </AccordionComponent>
  );
};
