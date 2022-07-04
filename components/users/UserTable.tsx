import { User } from "escolas-shared";
import React from 'react';
import { Utils } from "../../lib/utils";
import ResourceTable, { BasicResourceTableProps } from "../resources/ResourceTable";
import FormItem from "../ui/forms/FormItem";
import Input from "../ui/inputs/Input";
import Label from "../ui/inputs/Label";

type UserTableProps = BasicResourceTableProps<User>;

const UserTable: React.FC<UserTableProps> = (props) => {
  const [filterNome, setFilterNome] = React.useState('');

  return (
    <ResourceTable
      {...props}
      headerCols={[
        { label: 'Nome' },
        { label: 'E-mail' },
        { label: 'Papel' },
      ]}
      generateCols={(res) => [
        { content: res.nome },
        { content: res.email },
        { content: Utils.userRoleLabel(res.role) },
      ]}
      applyFilter={(resources) => {
        const filterNomeLower = filterNome.trim().toLowerCase();
        const hasFilterNomeLower = filterNomeLower ? true : false;

        if (!hasFilterNomeLower)
          return resources;

        return resources.filter((categoria) => {
          let pass = true;

          if (hasFilterNomeLower)
            pass &&= categoria.nome.toLocaleLowerCase().includes(filterNomeLower)
              || categoria.email.toLocaleLowerCase().includes(filterNomeLower)
              || categoria.role.toLocaleLowerCase().includes(filterNomeLower);

          return pass;
        });
      }}
      filtersContent={(
        <FormItem className="lg:w-4/12 px-4">
          <Label label="Pesquisar" htmlFor="filter-busca" />
          <Input
            htmlId="filter-busca"
            placeholder="Pesquisar..."
            value={filterNome}
            onChange={setFilterNome}
            debounceTimeMs={250}
          />
        </FormItem>
      )}
    />
  );
};

export default React.memo(UserTable);
