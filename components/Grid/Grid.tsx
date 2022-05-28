import * as React from 'react';
import {
  ColumnDirective,
  ColumnsDirective,
  ColumnChooser,
  Filter,
  GridComponent,
  Inject,
  Toolbar,
  Page,
  Edit,
  DetailRow,
} from '@syncfusion/ej2-react-grids';
import {
  EditOptions,
  GRID_PEOPLE_CONFIG_COL,
  ToolbarOptions,
} from '../Grid/assets/config';
import { useFilterGender } from '../Grid/assets/useFilterGener';
import { templateCell } from '../Grid/assets/utils';
import { People } from '../../store/entity/people/models';

interface GridProps {
  data: People[];
  size: number;
}
export const Grid = ({ data, size }: GridProps) => {
  const {
    gridRef,
    ChildGridOptions,
    RowDataBound,
    filterTemplate,
    handleToolbarClick,
  } = useFilterGender(data);

  return (
    <React.Fragment>
      <GridComponent
        id="overviewgrid"
        ref={gridRef}
        dataSource={data}
        allowPaging={true}
        allowFiltering={true}
        enableAltRow={true}
        editSettings={EditOptions}
        showColumnChooser={true}
        childGrid={ChildGridOptions}
        rowDataBound={RowDataBound}
        toolbar={ToolbarOptions}
        toolbarClick={handleToolbarClick}
        pageSettings={{ pageSize: size }}
      >
        <ColumnsDirective>
          {GRID_PEOPLE_CONFIG_COL.map((field, i) => (
            <ColumnDirective
              className={`row ${field}`}
              key={i}
              field={field}
              filterTemplate={filterTemplate(field)}
              template={templateCell(field)}
              {...(field === 'Gender'
                ? { editType: 'dropdownedit' }
                : { allowEditing: false })}
            />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Page, ColumnChooser, Toolbar, Filter, Edit, DetailRow]}
        />
      </GridComponent>
    </React.Fragment>
  );
};
