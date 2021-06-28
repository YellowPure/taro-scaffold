/**
 * @module:  滚动列表
 * @author Liang Huang
 * @date 2020-10-19 11:28:22
 */

import React, { Fragment } from 'react';
// import { observer } from 'mobx-react';
import { ScrollView, View } from '@tarojs/components';
import { ScrollViewProps } from '@tarojs/components/types/ScrollView';
import { AtActivityIndicator } from 'taro-ui';
import NonePage from '../NonePage';

interface IProps<T> {
  /**
   * scrollview classname
   */
  className?: string;
  scrollViewProps?: ScrollViewProps;
  dataSource: T[];
  renderRow: (T) => void;
  nonePageHeight?: string;
  /**
   * 下拉刷新
   */
  refreshHandler?: () => void;
  /**
   * 下一页
   */
  nextHandler?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  refreshing?: boolean;
}

const ScrollList = React.forwardRef((props: IProps<any>) => {
  const {
    hasMore,
    refreshing,
    loading,
    className,
    scrollViewProps,
    dataSource,
    renderRow,
    nonePageHeight,
    refreshHandler,
    nextHandler
  } = props;
  // const [refreshing, setRefreshing] = useState(false);
  // const [pulling, setPulling] = useState(false);
  // const [loading, setLoading] = useState(false);
  // useImperativeHandle(ref, () => ({
  //   setRefreshing,
  //   // setPulling,
  //   setLoading
  // }))
  function refreshList() {
    // setRefreshing(true);
    refreshHandler && refreshHandler();
  }

  function getNextPage() {
    if (hasMore) {
      nextHandler && nextHandler();
    }
  }

  return (
    <ScrollView
      className={`scroll-list ${className || ''}`}
      scrollY
      refresherEnabled={!!refreshHandler}
      refresherTriggered={refreshing}
      refresherDefaultStyle="black"
      refresherBackground="#f5f5f5"
      onRefresherRefresh={() => refreshList()}
      // onRefresherPulling={() => {
      //   if (!pulling) setPulling(true);
      // }}
      // onRefresherRestore={() => {
      //   setPulling(false);
      // }}
      onScrollToLower={getNextPage}
      {...scrollViewProps}
    >
      <View className="scroll-list-content">
        {dataSource && !!dataSource.length ? (
          <Fragment>
            {/* {!pulling && <AtDivider className='refresh-divider' content={refreshing ? '刷新中' : '下拉刷新'} />} */}
            {dataSource.map(d => renderRow(d))}
            {hasMore && loading && (
              <View style={{ display: 'flex', justifyContent: 'center', padding: 8 }}>
                <AtActivityIndicator color="#F76D1D" size={32} content="加载中..." />
              </View>
            )}
          </Fragment>
        ) : (
          <NonePage
            subText="暂无数据"
            wrapHeight={`${nonePageHeight || 'calc(100vh - 250px)'}`}
            imgUrl="https://static.clouderwork.com/mini/img-none_data-e9a849081f.png"
          />
        )}
      </View>
    </ScrollView>
  );
});

export default ScrollList;
