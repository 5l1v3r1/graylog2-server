// @flow strict
import * as React from 'react';
import styled, { type StyledComponent } from 'styled-components';

import View, { type ViewType } from 'views/logic/views/View';
import { type ThemeInterface } from 'theme';
import { type SearchPageLayoutType } from 'views/components/contexts/SearchPageLayoutContext';
import { type ViewMetaData as ViewMetadata } from 'views/stores/ViewMetadataStore';

import ViewTypeLabel from 'views/components/ViewTypeLabel';
import ViewTypeContext from 'views/components/contexts/ViewTypeContext';
import { IconButton } from 'components/common';

import type { SidebarSection, SidebarSectionProps } from './sidebarSections';

type Props = {
  section: SidebarSection,
  closeSidebar: () => void,
  sectionProps: SidebarSectionProps,
  searchPageLayout: ?SearchPageLayoutType,
  isPinned: boolean,
  viewMetadata: ViewMetadata,
};

export const Container: StyledComponent<{ isPinned: boolean }, ThemeInterface, HTMLDivElement> = styled.div(({ theme, isPinned }) => `
  color: ${theme.colors.global.textDefault};
  background: ${theme.colors.global.contentBackground};
  position: ${isPinned ? 'static' : 'fixed'}
  box-shadow:
    inset 0 13px 5px -10px ${theme.colors.gray[80]},
    inset 0 -13px 5px -10px ${theme.colors.gray[80]};
  top: ${isPinned ? 0 : '50px'};
  left: ${isPinned ? 0 : '50px'};
  padding: 5px 15px;
  width: 270px;
  height: 100%;
  
  overflow-y: auto;
  z-index: 3;
`);

const Header: StyledComponent<{}, void, HTMLDivElement> = styled.div`
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 24px;
`;

const OverlayToggle: StyledComponent<{ isOverlay: boolean }, ThemeInterface, HTMLDivElement> = styled.div(({ theme, isOverlay }) => `
  > * {
    height: 25px;
    width: 25px;
    font-size: 18px;
    color: ${isOverlay ? theme.colors.variant.info : theme.colors.gray[30]};
  }
`);

const HorizontalRule = styled.hr`
  margin: 5px 0 10px 0;
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
`;

const toggleSidebarPinning = (searchPageLayout) => {
  if (!searchPageLayout) {
    return;
  }
  const { setLayout, layout } = searchPageLayout;
  const isPinned = layout?.sidebar.pinned;
  const updatedLayout = {
    ...layout,
    sidebar: { pinned: !isPinned },
  };
  setLayout(updatedLayout);
};

const sidebarTitle = (viewMetadata: ViewMetadata, viewType: ?ViewType) => {
  const defaultTitle = `Untitled ${viewType ? ViewTypeLabel({ type: viewType }) : View.Type.Search}`;
  return viewMetadata.title || defaultTitle;
};

const SectionContent = ({ section, closeSidebar, sectionProps, isPinned, searchPageLayout, viewMetadata }: Props) => {
  const Content = section.content;
  return (
    <ViewTypeContext.Consumer>
      {(viewType) => {
        const title = sidebarTitle(viewMetadata, viewType);
        return (
          <Container isPinned={isPinned}>
            <Header title={title}>
              <Title onClick={closeSidebar}>{title}</Title>
              <OverlayToggle isOverlay={!isPinned}>
                <IconButton onClick={() => toggleSidebarPinning(searchPageLayout)}
                            title={`Display sidebar ${isPinned ? 'as overlay' : 'inline'}`}
                            name="layer-group" />
              </OverlayToggle>
            </Header>
            <HorizontalRule />
            <SectionTitle>{section.title}</SectionTitle>
            <Content {...sectionProps} />
          </Container>
        );
      }}
    </ViewTypeContext.Consumer>
  );
};

export default SectionContent;
