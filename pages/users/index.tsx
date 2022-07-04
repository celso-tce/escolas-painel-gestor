import type { NextPage } from 'next';
import React from 'react';
import { User } from 'escolas-shared';
import { ApiServiceContext } from '../_app';
import ResourcesPage from "../../components/resources/ResourcePage";
import ResourceDetails from "../../components/resources/ResourceDetails";
import { CreateUserDto } from "../../lib/services/api-service";
import UserTable from "../../components/users/UserTable";
import UserForm from "../../components/users/UserForm";
import { Utils } from "../../lib/utils";

const UsersPage: NextPage = () => {
  const apiService = React.useContext(ApiServiceContext);

  const buildDetails = React.useCallback((res: User) => (
    <ResourceDetails
      data={[
        { label: 'Nome', value: res.nome },
        { label: 'E-mail', value: res.email },
        { label: 'Papel', value: Utils.userRoleLabel(res.role) },
      ]}
    />
  ), []);

  return (
    <ResourcesPage<User, CreateUserDto>
      labelSingular="Usuário"
      labelPlural="Usuários"
      getResourceTitle={(res) => res.nome}
      serviceProvider={{
        getResources: apiService.getUsers,
        createResource: apiService.createUser,
        updateResource: apiService.updateUser,
        deleteResource: apiService.deleteUser,
      }}
      buildTabela={React.useCallback((props) => <UserTable {...props} />, [])}
      buildDetails={buildDetails}
      buildForm={React.useCallback((props) => <UserForm {...props} />, [])}
    />
  );
}

export default UsersPage;
