export type PayloadProps = {
  payload: object;
  method: string;
  apiUrl: string;
  headers?: object;
};
export type ApiDataProps = {
  apiUrl: string;
  params: object;
};

export type SidenavProps = {
  children?: MenuOptions[];
  icon?: React.ReactNode;
  key: string;
  label: string;
};

export type ObjectProps = {
  label?: string;
  name?: string;
  value?: string;
  _id?: string
}

export type filterProps = {
  label?: string;
  name?: string;
  value?: string;
  _id?: string
  children?: MenuOptions[];
}

export type ApiResponse = {
  result: ApiResponseProps;
};
export type ApiResponseProps = {
  data: any;
  message: string;
  status_code: number;
  success: boolean;
};

export type ProfileProps = {
  id: string;
  name: string;
  route: string;
  url: string;
};
export type ClientDetailProps = {
  clientId: string;
  combinedName: string;
  hcData: string;
  id: string;
  imgUrl: string;
  username: string;
}
export type assignmentProps = {
  first_name: string;
  last_name: string;
  display_url: string;
}
export type SortProps = {
  accessor: string
  sortDirection: string
}


export type ClientProps = {
  display_url: string;
  first_name: string;
  gwc_client_id: string;
  hc_assignment: assignmentProps;
  img_name: string;
  last_name: string;
  md_assignment: assignmentProps;
  _id: string;
}
export type UrlParams = {
  id: string
}

export type ColumnHeaders = {
  editable: boolean;
  field: string;
  filter: boolean;
  headerName: string;
  sort: boolean;
  width: number;
  [x: string]: any;
};

export type AdminRowProps = {
  description: string;
  id?: string;
  name: string;
  status: string;
};


export type UserListProps = {
  value: string;
  label: string;
};


export type MenuOptions = {
  key: string;
  label: string;
};
export type PiMenuOptions = {
  children?: MenuOptions[];
  key: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
};

export type Permissions = {
  key: string
  value: string | number | boolean
}

export type SelectProps = {
  _id?: string
  value: string;
  label: string;
};

export type HealthPlanUrlParams = {
  id: string
  tab: string
  health_plan_id: string
}

export type ModalProps = {
  is_open: boolean
  action: string
  message: string
  data: any,
  type: string
}