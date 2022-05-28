import * as React from 'react';
import { useDispatch } from 'react-redux';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataUtil } from '@syncfusion/ej2-data';
import { People, actions } from '../../../store/entity';

export const useFilterGender = (data: People[]) => {
  const dispatch = useDispatch();
  const dropdata = React.useRef(DataUtil.distinct(data, 'Gender'));
  const gridRef = React.useRef();
  const filterTemplate = React.useCallback(
    (field: string) => (props) => {
      const handleChange = (args) => {
        if (!gridRef || !gridRef?.current) return;
        args.value === 'Clear'
          ? gridRef?.current?.clearFiltering()
          : gridRef?.current?.filterByColumn('Gender', 'equal', args.value);
      };
      return (
        field === 'Gender' && (
          <DropDownListComponent
            id={props.column.field}
            popupHeight="250px"
            dataSource={[...dropdata.current, 'Clear']}
            change={handleChange}
          />
        )
      );
    },
    []
  );

  const handleToolbarClick = React.useCallback((args) => {
    if (!gridRef || !gridRef?.current) return;
    args.item.id === 'remove_odd' && dispatch(actions.selectEvenRows());
    args.item.id === 'get_data' && dispatch(actions.getPeopleWithDebounce());
  }, []);

  const ChildGridOptions = React.useMemo(
    () => ({
      columns: [{ field: 'Emails', headerText: 'Emails', textAlign: 'Right' }],
      dataSource: data,
      queryString: 'UserName',
    }),
    [data]
  );
  const RowDataBound = React.useCallback((args: any) => {
    if (!gridRef || !gridRef?.current) return;
    args.data.Emails?.length
      ? (args.row.querySelector('td').className =
          'e-customizedExpandcell e-detailrowcollapse')
      : (args.row.querySelector('td').innerHTML = ' ');
  }, []);

  return {
    gridRef,
    ChildGridOptions,
    RowDataBound,
    filterTemplate,
    handleToolbarClick,
  };
};
