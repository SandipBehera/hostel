<Row style={{ padding: "6px" }}>
              <Col sm="12">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="mb-2" style={{ width: "30%" }}>
                    <Label className="col-form-label"></Label>
                    <Select
                      options={hostel_name}
                      className="js-example-basic-single col-sm-12"
                    />
                  </div>

                  <div className="" style={{ width: "30%" }}>
                    <Label className="col-form-label"></Label>
                    <Select
                      options={floorData}
                      className="js-example-basic-single col-sm-12"
                    />
                  </div>
                  <div className="">
                    <Label className="col-form-label"></Label>
                    <InputGroup>
                      <InputGroupText>
                        <FaSearch />
                      </InputGroupText>

                      <Input
                        type="text"
                        placeholder="Search"
                        value={roomData}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </div>
                </div>
              </Col>
            </Row>
