import { User } from "escolas-shared";
import React from 'react';
import ReactSelect from "react-select";
import { CreateUserDto } from "../../lib/services/api-service";
import { SelectUtils } from "../../lib/ui-utils";
import ResourceForm, { BasicResourceFormProps } from "../resources/ResourceForm";
import FormItem from "../ui/forms/FormItem";
import FormSection from "../ui/forms/FormSection";
import Input from "../ui/inputs/Input";
import Label from "../ui/inputs/Label";

type UserFormProps = BasicResourceFormProps<User, CreateUserDto>;

const UserForm: React.FC<UserFormProps> = (props) => {
  const editUser = props.editResource;

  console.log(SelectUtils.userRoleOptions);

  return (
    <ResourceForm
      {...props}
      camposObrigatorios={{
        nome: { label: 'Nome' },
        email: { label: 'E-mail' },
        password: editUser ? undefined : { label: 'Senha' },
        passwordConf: editUser ? undefined : { label: 'Senha (confirmação)'},
        role: { label: 'Papel' },
      }}
      generateFormData={(parsedValues) => {
        if (parsedValues['password'] !== parsedValues['passwordConf']) {
          return 'A senha de confirmação difere da senha informada.';
        }

        return {
          nome: parsedValues['nome'],
          email: parsedValues['email'],
          password: parsedValues['password'],
          passwordConf: parsedValues['passwordConf'],
          role: parsedValues['role'],
        };
      }}
      formContent={(<>
        <FormSection header="Informações">
          <FormItem className="lg:w-6/12 px-4">
            <Label label="Nome" htmlFor="i-nome" />
            <Input htmlId="i-nome" name="nome" defaultValue={props.editResource?.nome} />
          </FormItem>

          <FormItem className="lg:w-6/12 px-4">
            <Label label="E-mail" htmlFor="i-tipo" />
            <Input htmlId="i-email" name="email" type="email"
              defaultValue={props.editResource?.email} />
          </FormItem>

          <FormItem className="lg:w-6/12 px-4">
            <Label label="Senha" htmlFor="i-password" />
            <Input htmlId="i-password" name="password" type="password" />
          </FormItem>

          <FormItem className="lg:w-6/12 px-4">
            <Label label="Senha (confirmação)" htmlFor="i-password-conf" />
            <Input htmlId="i-password-conf" name="passwordConf" type="password" />
          </FormItem>

          <FormItem className="lg:w-6/12 px-4">
            <Label label="Papel" htmlFor="i-role" />
            <ReactSelect
              id="i-role"
              options={SelectUtils.userRoleOptions}
              name="role"
              defaultValue={
                editUser
                  ? SelectUtils.userRoleOptions.find(opt => opt.value === editUser.role)
                  : undefined
              }
            />
          </FormItem>
        </FormSection>
      </>)}
    />
  );
};

export default React.memo(UserForm);
