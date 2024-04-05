import * as React from 'react';
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import Table from 'antd/lib/table/Table';
import type { ColumnsType } from 'antd/lib/table';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { WatchObject } from '../Classes/WatchObject';

const columns: ColumnsType<WatchObject> = [
  {
    title: 'Name',
    dataIndex: 'PropertyName',
    key: 'PropertyName',
  },
  {
    title: 'Value',
    dataIndex: 'DisplayName',
    key: 'DisplayName',
  },
  {
    title: 'Type',
    dataIndex: 'TypeName',
    key: 'TypeName',
  },
];

export interface IWatchComponentProps {
  value: any;
}

export const WatchComponent: React.FunctionComponent<IWatchComponentProps> = props => {
  const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<WatchObject[]>((new WatchObject("Root", props.value, "0")).children);

  React.useEffect(() => {
    setValue((new WatchObject("Root", props.value, "0")).children);
  }, [props.value]);

  return (
    <>
      <KeyboardEventHandler
        handleKeys={['ctrl+shift+b']} onKeyEvent={(key: any) => { setDialogVisible(true) }} />
      <Dialog
        hidden={!dialogVisible}
        modalProps={{
          isBlocking: true,
          styles: {
            main: {
              selectors: {
                ['@media (min-width: 480px)']: {
                  minWidth: '50%',
                  width: '50%'
                }
              }
            }
          }
        }}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Watch...'
        }}
        onDismiss={() => {
          setDialogVisible(false);
        }}
      >
        <Table
          columns={columns}
          dataSource={value}
          pagination={false}
        />
      </Dialog>
    </>);
}