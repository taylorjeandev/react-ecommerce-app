import { Text, Flex, Box, Select } from "@chakra-ui/react";

const Category = ({ category, handleCategoryChange }) => {
  return (
    <Flex m={2} justify="center">
      <Box m={2} maxW="400px" position>
        <Text>Filter by Category: </Text>
        <Select
          maxW="400px"
          name="category-list"
          id="category-list"
          onChange={handleCategoryChange}
        >
          <option value="All">All</option>
          {category.map((category, index) => {
            return (
              <option
                key={index}
                onChange={handleCategoryChange}
                value={category}
              >
                {category}
              </option>
            );
          })}
        </Select>
      </Box>
    </Flex>
  );
};

export default Category;
