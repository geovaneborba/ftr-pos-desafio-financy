import { Colors, Icons } from "@prisma/client";
import { Field, InputType, registerEnumType } from "type-graphql";

registerEnumType(Colors, {
  name: "Colors",
  description: "Cores disponíveis para as categorias",
});

registerEnumType(Icons, {
  name: "Icons",
  description: "Ícones disponíveis para as categorias",
});

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Colors)
  color!: Colors;

  @Field(() => Icons)
  icon!: Icons;
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String)
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Colors, { nullable: true })
  color?: Colors;

  @Field(() => Icons, { nullable: true })
  icon?: Icons;
}

@InputType()
export class ListCategoriesInput {
  @Field(() => Number, { nullable: true })
  limit?: number;
}
