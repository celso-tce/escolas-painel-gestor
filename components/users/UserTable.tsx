import { User } from "escolas-shared";
import React from 'react';
import ReactSelect, { SingleValue } from "react-select";
import { SelectUtils, UserRoleOptionType } from "../../lib/ui-utils";
import { Utils } from "../../lib/utils";
import ResourceTable, { BasicResourceTableProps } from "../resources/ResourceTable";
import FormItem from "../ui/forms/FormItem";
import Input from "../ui/inputs/Input";
import Label from "../ui/inputs/Label";

type UserTableProps = BasicResourceTableProps<User>;

const userRoleOptions = [
  { value: undefined, label: 'Todos' },
  ...SelectUtils.userRoleOptions,
];

const UserTable: React.FC<UserTableProps> = (props) => {
  const [filterNome, setFilterNome] = React.useState('');

  const [filterRoleOption, setFilterRoleOption] =
    React.useState<SingleValue<UserRoleOptionType>>(userRoleOptions[0]);

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
        const filterRole = filterRoleOption?.value;

        const hasFilterNomeLower = filterNomeLower ? true : false;
        const hasFilterRole = filterRole !== undefined;

        if (!hasFilterNomeLower && !hasFilterRole)
          return resources;

        return resources.filter((user) => {
          let pass = true;

          if (hasFilterNomeLower)
            pass &&= user.nome.toLocaleLowerCase().includes(filterNomeLower)
              || user.email.toLocaleLowerCase().includes(filterNomeLower)
              || user.role.toLocaleLowerCase().includes(filterNomeLower);

          if (hasFilterRole) {
            pass &&= user.role === filterRole;
          }

          return pass;
        });
      }}
      filtersContent={(<>
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

        <FormItem className="lg:w-3/12 px-4">
          <Label label="Papel" htmlFor="filter-role" />
          <ReactSelect
            id="filter-role"
            options={userRoleOptions}
            value={filterRoleOption}
            onChange={(newValue) => setFilterRoleOption(newValue)}
          />
        </FormItem>
      </>)}
    />
  );
};

export default React.memo(UserTable);
